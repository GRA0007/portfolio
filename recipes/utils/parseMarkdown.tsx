import remarkWikiLink from '@portaljs/remark-wiki-link'
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
import { wikiLinkResolver } from './wikiLinkResolver'

export const parseMd = async (markdown: string, objects: string[]): Promise<React.ReactNode> => {
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
              <div className="flex items-start">
                <label className="flex items-start">
                  <input type="checkbox" className="peer size-0 appearance-none opacity-0" />
                  <div className="group mt-[.4em] mr-3 flex size-4 shrink-0 cursor-pointer items-center justify-center rounded-sm border-[1.5px] peer-checked:bg-current peer-focus-visible:ring-2">
                    <CheckIcon className="size-3 stroke-3 text-cream opacity-0 group-[:where(.peer):checked_~_*]:opacity-100" />
                  </div>
                  {children}
                </label>
              </div>
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
