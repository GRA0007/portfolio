import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import remarkWikiLink from '@portaljs/remark-wiki-link'
import { getS3Url } from 'common/src/getS3Url'
import { CheckIcon } from 'lucide-react'
import { fromMarkdown } from 'mdast-util-from-markdown'
import Link from 'next/link'
import { cache } from 'react'
import react from 'react/jsx-runtime'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeReact, { type Components } from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkSmartypants from 'remark-smartypants'
import { unified } from 'unified'
import { VFile } from 'vfile'
import { matter } from 'vfile-matter'
import { env } from '/env'

const s3 = new S3Client({
  region: env.NEXT_PUBLIC_AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY_ID, secretAccessKey: env.AWS_SECRET_ACCESS_KEY },
})

/** Take a path like `Recipes/My Cool Recipe.md` and strip the path and file extension to return `My Cool Recipe` */
const getPageName = (filename: string) => {
  const nameParts = filename.split('/')
  return nameParts[nameParts.length - 1].slice(0, -3).trim()
}

/** Turns a page name into a slug like `my-cool-recipe` */
const slugify = (name: string) => {
  return name.replace(/\s+/g, '-').toLocaleLowerCase()
}

const wikiLinkResolver = (filename: string, objects: string[]) => {
  const match = objects.find(
    (path) =>
      path.toLocaleLowerCase().endsWith(filename.toLocaleLowerCase()) ||
      path.toLocaleLowerCase().endsWith(`${filename.toLocaleLowerCase()}.md`),
  )
  if (!match) return '/404'
  if (match.endsWith('.md')) return `/${slugify(getPageName(match))}`
  return getS3Url(match, env)
}

const parseMd = async (markdown: string, objects: string[]) => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkWikiLink, { wikiLinkResolver: (name: string) => [wikiLinkResolver(name, objects)] })
    .use(remarkRehype)
    .use(rehypeExternalLinks)
    .use(rehypeReact, {
      ...react,
      components: {
        li: ({ children, className }) => (
          <li>
            {className === 'task-list-item' ? (
              <label className="flex items-start">
                <input type="checkbox" className="peer size-0 appearance-none opacity-0" />
                <div className="group mt-[.4em] mr-3 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border-[1.5px] peer-checked:bg-current">
                  <CheckIcon className="size-3 stroke-3 text-cream opacity-0 group-[:where(.peer):checked_~_*]:opacity-100" />
                </div>
                {children}
              </label>
            ) : (
              children
            )}
          </li>
        ),
        input: () => null,
        link: (props) => <Link {...props} />,
        h2: (props) => <h3 {...props} />,
      } satisfies Components,
    })
    .process(markdown)

  return file.result
}

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

// const parseMDX = async (filename: string, source: string, objects: string[]) => {
//   const { content, frontmatter } = await compileMDX<
//     {
//       difficulty?: string
//       makes?: string
//       tags?: string[]
//       published?: string
//       lastEdited?: string
//     } & { [key: `${string} time`]: number }
//   >({
//     source,
//     options: {
//       parseFrontmatter: true,
//       mdxOptions: {
//         remarkPlugins: [
//           remarkGfm,
//           [remarkWikiLink, { wikiLinkResolver: (name: string) => [wikiLinkResolver(name, objects)] }],
//         ],
//       },
//     },
//     components: {
//       // TODO: Put images inside figure elements and parse captions
//     },
//   })

//   if (!frontmatter.published) throw new Error('Recipe unpublished')
//   if (new Date(frontmatter.published).valueOf() > Date.now())
//     throw new Error('Publish date in the future, will be published later')

//   const timeParts = Object.keys(frontmatter).flatMap((key) => {
//     if (!key.endsWith(' time')) return []
//     const value = frontmatter[key as keyof typeof frontmatter]
//     if (!value) return []
//     return [{ name: key.slice(0, -5), value: Number(value) }]
//   })

//   return {
//     slug: slugify(getPageName(filename)),
//     title: getPageName(filename),
//     difficulty: frontmatter.difficulty?.length ?? 0,
//     makes: frontmatter.makes || null,
//     tags: frontmatter.tags ?? [],
//     time:
//       timeParts.length > 0
//         ? {
//             total: timeParts.reduce((total, part) => total + part.value, 0),
//             parts: timeParts,
//           }
//         : null,
//     published: new Date(frontmatter.published),
//     lastEdited: frontmatter.lastEdited ? new Date(frontmatter.lastEdited) : null,
//     image: getMainImageLink(source),
//     description: source.split('---\n')[2].slice(0, 300).trim(),
//     content,
//     tree: await parseMD(filename, source, objects),
//   }
// }

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
