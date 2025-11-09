import { CheckIcon } from 'lucide-react'
import Link from 'next/link'
import react from 'react/jsx-runtime'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeReact, { type Components } from 'rehype-react'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkSmartypants from 'remark-smartypants'
import { unified } from 'unified'
import { fetchImageDimensions } from '/utils/fetchImageDimensions'
import remarkFraction from './fraction'
import { linkResolver } from './linkResolver'
import remarkWikiLink from './wikiLink'

export const parseMd = async (markdown: string, objects: string[]): Promise<React.ReactNode> => {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkWikiLink)
    .use(remarkFraction)
    .use(remarkRehype)
    .use(rehypeExternalLinks)
    .use(rehypeReact, {
      ...react,
      passNode: true,
      components: {
        li: ({ children, className }) => (
          <li>
            {className === 'task-list-item' ? (
              <div className="flex items-start">
                <label className="flex items-start">
                  <input type="checkbox" className="peer size-0 appearance-none opacity-0" />
                  <div className="group mt-[.4em] mr-3 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border-[1.5px] peer-checked:bg-current peer-focus-visible:ring-2">
                    <CheckIcon className="size-3 stroke-3 text-cream opacity-0 group-[:where(.peer):checked_~_*]:opacity-100" />
                  </div>
                  <span>{children}</span>
                </label>
              </div>
            ) : (
              children
            )}
          </li>
        ),
        input: () => null,
        a: ({ node, href, ...props }) => (
          <Link href={href.startsWith('http') ? href : linkResolver(href, objects)} {...props} />
        ),
        h2: ({ node, ...props }) => <h3 {...props} />,
        h3: ({ node, ...props }) => <h4 {...props} />,
        h4: ({ node, ...props }) => <h5 {...props} />,
        h5: ({ node, ...props }) => <h6 {...props} />,
        img: async ({ src, alt, title }) => {
          const resolvedSrc = src.startsWith('http') ? src : linkResolver(src, objects)
          const imageSize = await fetchImageDimensions(resolvedSrc)

          return (
            <figure>
              <img
                src={resolvedSrc}
                alt={alt}
                width={imageSize?.width}
                height={imageSize?.height}
                className="rounded-lg bg-current/10"
              />
              {title && <figcaption className="mt-1">{title}</figcaption>}
            </figure>
          )
        },
        p: ({ node, children, ...props }) =>
          // Don't surround images in paragraphs
          node.children.some((child: { tagName: string }) => child.tagName === 'img') ? (
            children
          ) : (
            <p {...props}>{children}</p>
          ),
      } satisfies Components,
    })
    .process(markdown)

  return file.result
}
