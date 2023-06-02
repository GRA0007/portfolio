import Syntax from 'react-syntax-highlighter/dist/esm/prism'
import okida from 'react-syntax-highlighter/dist/esm/styles/prism/okaidia'
import Link from 'next/link'
import { splitArrayBy } from '@giraugh/tools'
import { Client, isFullBlock, isFullPage } from '@notionhq/client'
import { BlockObjectResponse, RichTextItemResponse } from '@notionhq/client/build/src/api-endpoints'

const notion = new Client({ auth: process.env.NOTION_API_KEY });

/** Format a date like `May 23, 2021` */
const formatDate = (from: string | undefined) => {
  if (!from) return
  return new Date(from).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

/** Extract the YouTube video ID from a URL */
const ytid = (url: string) => {
  const match = url.match(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/)
  return (match && match[7].length == 11) ? match[7] : false
}

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

const renderBlockText = (text: RichTextItemResponse[]) =>
  text.map((node, i) => {
    if (node.type === 'text') {
      const Tag = node.annotations.code ? 'code' : 'span'

      // Add styles
      const el = <Tag key={i} style={{
        ...node.annotations.bold && { fontWeight: 600 },
        ...node.annotations.italic && { fontStyle: 'italic' },
        ...node.annotations.strikethrough && { textDecoration: 'line-through' },
        ...node.annotations.underline && { textDecoration: 'underline' },
        ...node.annotations.strikethrough && node.annotations.underline && { textDecoration: 'line-through underline' },
      }}>{node.text.content}</Tag>

      // Wrap in a link
      if (node.text.link) {
        return <Link key={`${i}_link`} href={node.text.link.url} target="_blank" rel="nofollow noreferrer">{el}</Link>
      }
      return el
    }
  })

const renderBlock = (block: BlockObjectResponse) => {
  if (block.type === 'paragraph') return <p key={block.id}>{renderBlockText(block.paragraph.rich_text)}</p>
  if (block.type === 'heading_1') return <h2 key={block.id}>{renderBlockText(block.heading_1.rich_text)}</h2>
  if (block.type === 'heading_2') return <h3 key={block.id}>{renderBlockText(block.heading_2.rich_text)}</h3>
  if (block.type === 'heading_3') return <h4 key={block.id}>{renderBlockText(block.heading_3.rich_text)}</h4>
  if (block.type === 'bulleted_list_item') return <li key={block.id}>{renderBlockText(block.bulleted_list_item.rich_text)}</li>
  if (block.type === 'numbered_list_item') return <li key={block.id}>{renderBlockText(block.numbered_list_item.rich_text)}</li>
  if (block.type === 'quote') return <blockquote key={block.id}>{renderBlockText(block.quote.rich_text)}</blockquote>

  if (block.type === 'code') return <Syntax
    key={block.id}
    style={okida}
    language={block.code.language}
    customStyle={{
      background: 'none',
      textShadow: 'none',
      margin: 'initial',
      padding: 0,
      fontFamily: 'initial',
      tabSize: 2,
      borderRadius: 0,
    }}
    codeTagProps={{ style: {} }}
  >
    {block.code.rich_text[0].type === 'text' ? block.code.rich_text[0].text.content : ''}
  </Syntax>

  // if (block.type === 'code') return <pre key={block.id}>
  //   <code data-language={block.code.language}>
  //     {block.code.rich_text[0].type === 'text' && block.code.rich_text[0].text.content}
  //   </code>
  // </pre>

  if (block.type === 'image') return <figure key={block.id}>
    <img
      src={block.image.type === 'external' ? block.image.external.url : block.image.file.url}
      alt={(block.image.caption.length > 0 && block.image.caption[0].type === 'text' && block.image.caption[0].text.content) || ''}
    />
    {block.image.caption.length > 0 ? <figcaption>
      {(block.image.caption[0].type === 'text' && block.image.caption[0].text.content) || ''}
    </figcaption> : null}
  </figure>

  if (block.type === 'divider') return <hr key={block.id} />

  if (block.type === 'video' && block.video.type === 'external' && block.video.external.url.includes('you')) return <figure key={block.id}>
    <iframe
      width="560"
      height="315"
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      src={`https://www.youtube.com/embed/${ytid(block.video.external?.url)}`}
    />
    {block.video.caption.length > 0 ? <figcaption>
      {(block.video.caption[0].type === 'text' && block.video.caption[0].text.content) || ''}
    </figcaption> : null}
  </figure>

  if (block.type === 'embed') return <figure key={block.id}>
    {block.embed.url.includes('codepen') && <iframe
      height="300"
      style={{ width: '100%' }}
      scrolling="no"
      title="Codepen embed"
      allowFullScreen
      allowTransparency
      loading="lazy"
      src={block.embed.url.replace('/pen/', '/embed/')}
    />}
    {block.embed.caption.length > 0 ? <figcaption>
      {(block.embed.caption[0].type === 'text' && block.embed.caption[0].text.content) || ''}
    </figcaption> : null}
  </figure>
}

export const fetchPost = async (id: string) => {
  if (!process.env.BLOG_DATABASE_ID) return

  // Get page details
  const pageRes = await notion.pages.retrieve({ page_id: id })
  if (!pageRes || !isFullPage(pageRes)) return
  if (pageRes.properties.Number.type !== 'number'
    || pageRes.properties.Title.type !== 'title'
    || pageRes.properties.Published.type !== 'date'
    || pageRes.properties['Last edited'].type !== 'last_edited_time'
  ) return
  const meta = {
    id: pageRes.id,
    number: pageRes.properties.Number.number,
    title: pageRes.properties.Title.title[0].plain_text,
    cover: pageRes.cover?.type === 'external' ? pageRes.cover.external.url : pageRes.cover?.file.url,
    published: formatDate(pageRes.properties.Published.date?.start),
    edited: formatDate(pageRes.properties['Last edited'].last_edited_time),
  }

  // Get page content
  const content = await notion.blocks.children.list({ block_id: id })
  const blocks = content.results.filter(isFullBlock)
  // Group list items together
  const groupedBlocks = splitArrayBy(blocks, (a, b) => a.type !== b.type || !['bulleted_list_item', 'numbered_list_item'].includes(a.type))

  const elements = groupedBlocks.flatMap((blockGroup, i) => {
    const renderedBlocks = blockGroup.map(renderBlock)
    if (blockGroup[0].type === 'bulleted_list_item') return [<ul key={i}>{renderedBlocks}</ul>]
    if (blockGroup[0].type === 'numbered_list_item') return [<ol key={i}>{renderedBlocks}</ol>]
    return renderedBlocks
  })

  return { meta, elements }
}
