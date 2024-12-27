import type { Blog, WithContext } from 'schema-dts'
import { BlogEntry } from '/components/BlogEntry'
import { DesignWork } from '/components/DesignWork'
import { Eyes } from '/components/Eyes'
import { FriendCard } from '/components/FriendCard'
import { ProjectCard } from '/components/ProjectCard'
import { Socials } from '/components/Socials'
import { DESIGN_WORK } from '/res/designWork'
import { PROJECTS } from '/res/projects'
import { fetchBlogPosts } from '/utils/blog'
import { AllProjects } from './projects'

const projectCards = PROJECTS.map((project) => <ProjectCard key={project.name} {...project} />)

const Home = async () => {
  const posts = await fetchBlogPosts()

  return (
    <>
      <header className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-12 py-20">
        <Eyes />
        <h1 className="pointer-events-none relative z-10 bg-radial from-30% from-dark to-60% to-transparent p-12 text-center text-5xl [text-shadow:0_0_.2em_var(--dark)]">
          Hi, I’m
          <br />
          Benji
        </h1>
      </header>

      <main>
        <section className="bg-light px-gutter py-14 text-dark" aria-label="About Me">
          <p>
            I make websites, like this one. I am currently working for several{' '}
            <a href="https://www.linkedin.com/in/bengrant13/#experience-section" target="_blank" className="link">
              cool companies
            </a>{' '}
            doing very cool things.
          </p>
          <p className="my-5">I specialise in beautiful, accessible, helpful, and delightful digital experiences.</p>
          <p className="mb-8">
            With over {new Date().getFullYear() - 2016} years experience working in industry, I am well versed in
            technologies such as React, Express, Next, graphic design, and{' '}
            <a
              href="https://benjibenji.notion.site/benjibenji/307fb7f089f44301be2d9d3d8272d2ad?v=687c3dd456c747b9adb0547aeb757079"
              target="_blank"
              className="link"
            >
              cookies
            </a>
            .
          </p>

          <Socials />
        </section>

        <section className="px-gutter py-14">
          <h1 className="mb-10 text-4xl">Projects</h1>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-10">
            {projectCards.slice(0, 4)}
            <AllProjects>{projectCards.slice(4)}</AllProjects>
          </div>
        </section>

        <section className="bg-light py-14 text-dark">
          <h1 className="mb-10 px-gutter text-4xl">Design Work</h1>
          {DESIGN_WORK.map((work) => (
            <DesignWork key={work.name} {...work} />
          ))}
        </section>

        {posts.length > 0 && (
          <section className="bg-light pb-14 text-dark">
            <h1 className="mb-10 px-gutter text-4xl">Blog</h1>
            {posts.map((post) => (
              <BlogEntry key={post.slug} number={post.number} slug={post.slug} title={post.title} />
            ))}
          </section>
        )}

        <section className="bg-light px-gutter pb-14 text-dark">
          <h1 className="mb-10 text-4xl">Friends</h1>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-6 sm:grid-cols-3">
            <FriendCard name="Ben Koder" url="https://benkoder.com/" />
            <FriendCard name="Ewan Breakey" url="https://ewanb.me/" />
            <FriendCard name="Maxwell Reid" url="https://www.maxwellreid.tech/" />
            <FriendCard name="Linus Kay" url="https://libus.xyz/" />
            <FriendCard name="Tom Anderson" url="https://ando.gq/" />
            <FriendCard name="Thomas Dib" url="https://www.tdib.xyz/" />
          </div>
        </section>
      </main>

      <footer className="px-gutter py-16 text-center">
        <p className="mb-8 sm:px-24">
          Want to get in touch? I have an{' '}
          <a href="mailto:hi@bengrant.dev" className="link">
            email address
          </a>
          , or you can check out my other code projects on{' '}
          <a href="https://github.com/GRA0007/" target="_blank" className="link">
            Github
          </a>
          .
        </p>

        <Socials />
      </footer>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined schema
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            author: {
              '@type': 'Person',
              givenName: 'Benji',
              familyName: 'Grant',
              email: 'hi@bengrant.dev',
            },
          } satisfies WithContext<Blog>),
        }}
      />
    </>
  )
}

export default Home
