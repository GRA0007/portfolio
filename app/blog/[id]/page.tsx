import { Metadata } from 'next'
import { Fira_Code, Lexend_Zetta } from 'next/font/google'
import { notFound } from 'next/navigation'

import Nav from '/components/Nav/Nav'
import Section from '/components/Section/Section'
import Socials from '/components/Socials/Socials'
import { fetchPost } from '/services/blog'

import styles from './page.module.scss'

const lexendZetta = Lexend_Zetta({ subsets: ['latin'] })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--code-font' })

interface PageProps {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const post = await fetchPost(params.id).catch(() => undefined)

  const sharedMetadata = {
    title: post?.meta.title ?? 'Not Found',
    description: post?.description ?? 'This blog post doesn\'t exist',
  } satisfies Metadata

  return {
    ...sharedMetadata,
    keywords: ['benji', 'blog', ...post?.meta.tags.map(t => t.name) ?? []],
    openGraph: {
      type: 'article',
      ...sharedMetadata,
      images: post?.meta.cover,
      authors: 'Benji',
      tags: post?.meta.tags.map(t => t.name),
    },
  }
}

const Post = async ({ params }: PageProps) => {
  const post = await fetchPost(params.id).catch(() => undefined)
  if (!post) notFound()

  return <>
    <Nav />

    <header>
      {post.meta.cover && <img className={styles.bannerImage} src={post.meta.cover} alt="" />}
    </header>

    <main className={`${styles.content} ${firaCode.variable}`}>
      <Section>
        <div className={styles.meta}>
          <span className={lexendZetta.className}>{post.meta.number?.toString().padStart(2, '0')}</span>
          <span>{post.meta.published}</span>
        </div>
        <h1>{post.meta.title}</h1>

        {post.elements}

        <span className={styles.lastEdited}>Last edited {post.meta.edited}</span>
      </Section>
    </main>

    <footer className={styles.footer}>
      <Socials />
    </footer>
  </>
}

export default Post
