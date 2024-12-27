import type { Metadata } from 'next'
import { Fira_Code, Lexend_Zetta } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { BlogPosting, WithContext } from 'schema-dts'
import { Nav } from '/components/Nav'
import { Socials } from '/components/Socials'
import { fetchBlogPosts, getPost } from '/utils/blog'
import { formatDate } from '/utils/formatDate'

const lexendZetta = Lexend_Zetta({ subsets: ['latin'] })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--code-font' })

export const generateStaticParams = async () => {
  const posts = await fetchBlogPosts()

  return posts.map((post) => ({
    slug: post.slug.toLocaleLowerCase(),
  }))
}

type Params = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Params): Promise<Metadata> => {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return {
    title: post.title,
    description: post.description,
    keywords: ['benji', 'blog', ...post.tags],
    alternates: { canonical: `/blog/${post.slug.toLocaleLowerCase()}` },
    openGraph: {
      type: 'article',
      images: post.banner,
      authors: 'Benji',
      tags: post.tags,
    },
  }
}

const Post = async ({ params }: Params) => {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <>
      <Nav />

      {post.banner && <img className="h-60 w-full object-cover" src={post.banner} alt="" />}

      <main className={`${firaCode.variable} flex-1 px-gutter py-14`}>
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

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined schema
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            author: {
              '@type': 'Person',
              givenName: 'Benji',
              familyName: 'Grant',
              email: 'hi@bengrant.dev',
            },
            copyrightHolder: 'Benji Grant',
            copyrightYear: post.published.getFullYear(),
            dateCreated: post.published.toISOString(),
            datePublished: post.published.toISOString(),
            dateModified: post.lastEdited?.toISOString(),
            inLanguage: 'en',
            keywords: post.tags,
            name: post.title,
            image: post.banner,
            description: post.description,
          } satisfies WithContext<BlogPosting>),
        }}
      />
    </>
  )
}

export default Post
