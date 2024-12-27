import { Lexend_Zetta } from 'next/font/google'
import Link from 'next/link'

const lexendZetta = Lexend_Zetta({ subsets: ['latin'] })

interface BlogEntryProps {
  slug: string
  number: string
  title: string
}

export const BlogEntry = ({ slug, number, title }: BlogEntryProps) => {
  return (
    <Link href={`/blog/${slug}`} className="!no-underline group">
      <article className="flex items-center gap-3 pr-gutter">
        <span
          className={`${lexendZetta.className} block bg-[length:200%_100%] bg-gradient-to-r from-50% from-dark to-50% to-transparent bg-no-repeat py-4 pr-3 pl-gutter font-black text-2xl transition-[background-position-x,color] [background-position-x:100%] group-hover:text-light group-hover:[background-position-x:0]`}
        >
          {number}
        </span>
        <span className="underline transition-[font-weight] group-hover:font-semibold">{title}</span>
      </article>
    </Link>
  )
}
