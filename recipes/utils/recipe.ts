import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { getS3Url } from 'common/src/getS3Url'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { cache } from 'react'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { env } from '/env'
import { getPageName } from '/utils/getPageName'
import { parseMd } from '/utils/parseMarkdown'
import { slugify } from '/utils/slugify'
import { wikiLinkResolver } from '/utils/wikiLinkResolver'

const s3 = new S3Client({
  region: env.NEXT_PUBLIC_AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
})

type Sections = 'description' | 'ingredients' | 'method' | 'notes' | 'images' | 'sources'

const parseRecipe = async (filename: string, source: string, objects: string[]) => {
  const vfile = new VFile(source)

  // Extract frontmatter
  matter(vfile, { strip: true })
  const frontmatter = (vfile.data.matter ?? {}) as {
    difficulty?: string
    makes?: string
    tags?: string[]
    published?: string
    lastEdited?: string
  } & { [key: `${string} time`]: number }

  if (!frontmatter.published) throw new Error('Recipe unpublished')
  if (new Date(frontmatter.published).valueOf() > Date.now())
    throw new Error('Publish date in the future, will be published later')

  const markdown = String(vfile)

  const tree = fromMarkdown(markdown)

  // TODO: Support all image link formats
  const image =
    tree.children[0].type === 'paragraph' &&
    tree.children[0].children[0].type === 'text' &&
    tree.children[0].children[0].value.startsWith('![')
      ? tree.children[0].children[0].value.trim().slice(3, -2)
      : null

  const sectionRanges: Record<Sections, { start: number; end: number } | null> = {
    description: null,
    ingredients: null,
    method: null,
    notes: null,
    images: null,
    sources: null,
  }

  let currentSection: keyof typeof sectionRanges = 'description'
  for (const child of tree.children) {
    // Skip image
    if (image && child.position?.start.offset === 0) continue

    if (child.type === 'heading' && child.depth === 1) {
      if (child.children[0].type !== 'text') continue

      const headerValue = child.children[0].value.toLocaleLowerCase()
      if (Object.keys(sectionRanges).includes(headerValue)) currentSection = headerValue as keyof typeof sectionRanges
    } else {
      if (child.position?.start.offset === undefined || child.position.end.offset === undefined) continue

      if (!sectionRanges[currentSection]) {
        sectionRanges[currentSection] = { start: child.position.start.offset, end: child.position.end.offset }
      } else {
        // biome-ignore lint/style/noNonNullAssertion: Type inference incorrect here
        sectionRanges[currentSection]!.end = child.position.end.offset
      }
    }
  }

  const content: Record<Sections, React.ReactNode> = {
    description: sectionRanges.description
      ? await parseMd(markdown.slice(sectionRanges.description.start, sectionRanges.description.end), objects)
      : null,
    ingredients: sectionRanges.ingredients
      ? await parseMd(markdown.slice(sectionRanges.ingredients.start, sectionRanges.ingredients.end), objects)
      : null,
    method: sectionRanges.method
      ? await parseMd(markdown.slice(sectionRanges.method.start, sectionRanges.method.end), objects)
      : null,
    notes: sectionRanges.notes
      ? await parseMd(markdown.slice(sectionRanges.notes.start, sectionRanges.notes.end), objects)
      : null,
    images: null, // TODO:
    sources: sectionRanges.sources
      ? await parseMd(markdown.slice(sectionRanges.sources.start, sectionRanges.sources.end), objects)
      : null,
  }

  const timeParts = Object.keys(frontmatter).flatMap((key) => {
    if (!key.endsWith(' time')) return []
    const value = frontmatter[key as keyof typeof frontmatter]
    if (!value) return []
    return [{ name: key.slice(0, -5), value: Number(value) }]
  })

  return {
    slug: slugify(getPageName(filename)),
    title: getPageName(filename),
    difficulty: frontmatter.difficulty?.length ?? 0,
    makes: frontmatter.makes || null,
    tags: frontmatter.tags ?? [],
    time:
      timeParts.length > 0
        ? {
            total: timeParts.reduce((total, part) => total + part.value, 0),
            parts: timeParts,
          }
        : null,
    published: new Date(frontmatter.published),
    lastEdited: frontmatter.lastEdited ? new Date(frontmatter.lastEdited) : null,
    image: image ? wikiLinkResolver(image, objects) : null,
    description: source.split('---\n')[2].slice(0, 300).trim(),
    content,
  }
}

export const fetchRecipes = cache(async () => {
  // Fetch list of recipes from S3
  const res = await s3.send(new ListObjectsV2Command({ Bucket: env.NEXT_PUBLIC_AWS_BUCKET, Prefix: 'Recipes' }))
  const objects = res.Contents?.flatMap((item) => (item.Key ? [item.Key] : []))
  if (!objects) return []

  const markdownFiles = objects.filter((filename) => filename.endsWith('.md'))

  return Promise.allSettled(
    markdownFiles.map(async (filename) =>
      fetch(getS3Url(filename, env))
        .then((res) => res.text())
        .then((source) => parseRecipe(filename, source, objects)),
    ),
  ).then((results) =>
    results.flatMap((res) => {
      if (res.status === 'fulfilled') return [res.value]
      // console.warn(res.reason)
      return []
    }),
  )
})

export const getRecipe = cache(async (slug: string) => {
  const recipes = await fetchRecipes()

  return recipes.find((recipe) => recipe.slug.toLocaleLowerCase() === slug.toLocaleLowerCase())
})
