import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3'
import remarkWikiLink from '@portaljs/remark-wiki-link'
import { compileMDX } from 'next-mdx-remote/rsc'
import { cache } from 'react'
import remarkGfm from 'remark-gfm'
import { env } from '/env'
import { getS3Url } from '/utils/getS3Url'

const s3 = new S3Client({
  region: env.NEXT_PUBLIC_AWS_REGION,
  credentials: { accessKeyId: env.AWS_ACCESS_KEY, secretAccessKey: env.AWS_SECRET_KEY },
})

/** Take a path like `Portfolio/Blog/test-one.md` and strip the path and file extension to return `test-one` */
const getPageSlug = (filename: string) => {
  const nameParts = filename.split('/')
  return nameParts[nameParts.length - 1].slice(0, -3)
}

const wikiLinkResolver = (filename: string, objects: string[]) => {
  const match = objects.find((path) => path.endsWith(filename))
  if (!match) return '/404'
  if (match.endsWith('.md')) return `/blog/${getPageSlug(match)}`
  return getS3Url(match)
}

const parseBannerUrl = (banner: string | undefined, objects: string[]) => {
  if (!banner) return null

  if (banner.startsWith('[[') && banner.endsWith(']]')) {
    return wikiLinkResolver(banner.slice(2, -2), objects)
  }

  return banner
}

const parseMDX = async (filename: string, source: string, objects: string[]) => {
  const { content, frontmatter } = await compileMDX<{
    title?: string
    tags?: string[]
    published?: string
    lastEdited?: string
    banner?: string
  }>({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [
          remarkGfm,
          [remarkWikiLink, { wikiLinkResolver: (name: string) => wikiLinkResolver(name, objects) }],
        ],
      },
    },
  })

  if (!frontmatter.title || !frontmatter.published) throw new Error('Post missing title or published date')

  return {
    slug: getPageSlug(filename),
    title: frontmatter.title,
    tags: frontmatter.tags ?? [],
    published: new Date(frontmatter.published),
    lastEdited: frontmatter.lastEdited ? new Date(frontmatter.lastEdited) : null,
    banner: parseBannerUrl(frontmatter.banner, objects),
    content,
  }
}

export const fetchBlogPosts = cache(async () => {
  // Fetch list of blog objects from S3
  const res = await s3.send(new ListObjectsV2Command({ Bucket: env.NEXT_PUBLIC_AWS_BUCKET, Prefix: 'Portfolio/Blog' }))
  const objects = res.Contents?.flatMap((item) => (item.Key ? [item.Key] : []))
  if (!objects) return []

  const markdownFiles = objects.filter((filename) => filename.endsWith('.md'))

  const posts = await Promise.allSettled(
    markdownFiles.map(async (filename) =>
      fetch(getS3Url(filename))
        .then((res) => res.text())
        .then((source) => parseMDX(filename, source, objects)),
    ),
  ).then((results) =>
    results.flatMap((res) => {
      if (res.status === 'fulfilled') return [res.value]
      // console.warn(res.reason)
      return []
    }),
  )

  posts.sort((a, b) => b.published.valueOf() - a.published.valueOf())

  return posts.map((post, i) => ({ ...post, number: posts.length - 1 - i }))
})
