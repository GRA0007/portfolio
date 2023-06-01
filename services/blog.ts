import { Client, isFullPage } from '@notionhq/client'

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export const fetchPosts = async (count = 100) => {
  if (!process.env.BLOG_DATABASE_ID) return

  const res = await notion.databases.query({
    database_id: process.env.BLOG_DATABASE_ID,
    filter: {
      property: 'Published',
      date: {
        on_or_before: new Date().toISOString(),
      },
    },
    sorts: [
      {
        property: 'Published',
        direction: 'descending',
      },
    ],
    page_size: count,
  })

  return {
    posts: res.results.flatMap(page => {
      if (!isFullPage(page)) return []
      if (page.properties.Number.type !== 'number'
        || page.properties.Title.type !== 'title'
      ) return []

      return [{
        id: page.id,
        number: page.properties.Number.number,
        title: page.properties.Title.title[0].plain_text,
      }]
    }),
    has_more: res.has_more,
  }
}

export const fetchPost = async (id: string) => {
  if (!process.env.BLOG_DATABASE_ID) return

  const page = await notion.pages.retrieve({ page_id: id })
  const content = await notion.blocks.children.list({ block_id: id })

  return { page, content }
}
