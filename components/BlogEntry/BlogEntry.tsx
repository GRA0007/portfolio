import { Lexend_Zetta } from 'next/font/google'
import Link from 'next/link'

import styles from './BlogEntry.module.scss'

const lexendZetta = Lexend_Zetta({ subsets: ['latin'] })

interface BlogEntryProps {
  /** The Notion page ID */
  id: string
  number: number | null
  title: string
}

const BlogEntry = ({ id, number, title }: BlogEntryProps) =>
  <Link href={`/blog/${id}`} className={styles.link}>
    <span className={lexendZetta.className}>{number?.toString().padStart(2, '0') ?? '--'}</span>
    <span>{title}</span>
  </Link>

export default BlogEntry
