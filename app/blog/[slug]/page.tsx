import type { Metadata } from 'next'
import { Fira_Code, Lexend_Zetta } from 'next/font/google'
import { notFound } from 'next/navigation'
import { Nav } from '/components/Nav'
import { Socials } from '/components/Socials'
import { getPost } from '/utils/blog'
import { formatDate } from '/utils/formatDate'

const lexendZetta = Lexend_Zetta({ subsets: ['latin'] })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--code-font' })

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return {
    title: post.title,
    description: post.description,
    keywords: ['benji', 'blog', ...post.tags],
    openGraph: {
      type: 'article',
      images: post.banner,
      authors: 'Benji',
      tags: post.tags,
    },
  }
}

const Post = async ({ params }: PageProps) => {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />

      {post.banner && <img className="h-60 w-full object-cover" src={post.banner} alt="" />}

      <main className={`${firaCode.variable} px-gutter py-14`}>
        <div className="mb-4 flex items-baseline gap-6">
          <span className={`${lexendZetta.className} font-black text-7xl`}>{post.number}</span>
          <span>{formatDate(post.published)}</span>
        </div>

        <h1 className="text-5xl">{post.title}</h1>

        <article className="content mt-14 mb-8">{post.content}</article>

        {post.lastEdited && <p className="text-right text-xs opacity-75">Last edited {formatDate(post.lastEdited)}</p>}
      </main>

      <footer className="bg-light px-gutter py-6 text-dark">
        <Socials />
      </footer>
    </>
  )
}

export default Post
