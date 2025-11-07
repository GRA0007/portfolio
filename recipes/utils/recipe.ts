import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import { getS3Url } from 'common/src/getS3Url'
import { cache } from 'react'
import { env } from '/env'
import { wikiLinkResolver } from '/utils/wikiLinkResolver'
import { getFileTitle } from './getFileTitle'
import { getFrontmatter } from './getFrontmatter'
import { getRecipeSections, type Section } from './getRecipeSections'
import { parseMd } from './parseMarkdown'
import { slugify } from './slugify'
import { stripMarkdown } from './stripMarkdown'

const s3 = new S3Client({
  region: env.NEXT_PUBLIC_AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
})

const truncateDescription = (description: string): string => {
  if (description.length <= 300) return description
  return `${description.slice(0, 300).trim()}...`
}

type RecipeFrontmatter = {
  difficulty?: string
  makes?: string
  tags?: string[]
  published?: string
  lastEdited?: string
} & { [key: `${string} time`]: number }

const parseRecipe = async (filename: string, source: string, objects: string[]) => {
  const { frontmatter, markdown } = getFrontmatter<RecipeFrontmatter>(source)

  // Only allow published recipes
  if (!frontmatter.published) throw new Error('Recipe unpublished')
  if (new Date(frontmatter.published).valueOf() > Date.now())
    throw new Error('Publish date in the future, will be published later')

  const { image, ...sections } = getRecipeSections(markdown)
  if (!image || !sections.ingredients || !sections.method)
    throw new Error('Recipe is missing an image, ingredients or method')

  const imageSrc = wikiLinkResolver(image.src, objects)
  if (!imageSrc) throw new Error('Recipe image path cannot be resolved')
  image.src = imageSrc

  // Check if there are images
  if (sections.images?.toLocaleLowerCase().includes('no images')) {
    sections.images = undefined
  }

  // Parse markdown for each section
  const content: Record<Section, Awaited<ReturnType<typeof parseMd>>> = await Promise.all(
    Object.entries(sections).map(
      async ([section, md]) =>
        [
          section,
          md
            ? await parseMd(md, objects).catch((err) => {
                if (process.env.NODE_ENV === 'development') console.warn(err)
              })
            : undefined,
        ] as const,
    ),
  ).then(Object.fromEntries)

  const timeParts = Object.keys(frontmatter).flatMap((key) => {
    if (!key.endsWith(' time')) return []
    const value = frontmatter[key as keyof typeof frontmatter]
    if (!value) return []
    return [{ name: key.slice(0, -5), value: Number(value) }]
  })

  return {
    slug: slugify(getFileTitle(filename)),
    title: getFileTitle(filename),
    difficulty: frontmatter.difficulty?.length ?? 0,
    makes: frontmatter.makes,
    tags: frontmatter.tags ?? [],
    time:
      timeParts.length > 0
        ? {
            total: timeParts.reduce((total, part) => total + part.value, 0),
            parts: timeParts,
          }
        : undefined,
    published: new Date(frontmatter.published),
    lastEdited: frontmatter.lastEdited ? new Date(frontmatter.lastEdited) : undefined,
    image,
    description: sections.description && truncateDescription(stripMarkdown(sections.description)),
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
      if (process.env.NODE_ENV === 'development' && res.reason?.message !== 'Recipe unpublished')
        console.warn(res.reason)
      return []
    }),
  )
})

export const getRecipe = cache(async (slug: string) => {
  const recipes = await fetchRecipes()

  return recipes.find((recipe) => recipe.slug.toLocaleLowerCase() === slug.toLocaleLowerCase())
})

export const getAllTags = cache(async () => {
  const recipes = await fetchRecipes()
  const tags = []
  for (const recipe of recipes) tags.push(...recipe.tags)
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b))
})
