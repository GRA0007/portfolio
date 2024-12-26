import { DesignWork } from '/components/DesignWork'
import { Eyes } from '/components/Eyes'
import { ProjectCard } from '/components/ProjectCard'
import { Socials } from '/components/Socials'
import { DESIGN_WORK } from '/res/designWork'
import { PROJECTS } from '/res/projects'
import { AllProjects } from './projects'

const projectCards = PROJECTS.map((project) => <ProjectCard key={project.name} {...project} />)

const Home = async () => {
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
            <a href="https://www.linkedin.com/in/bengrant13/#experience-section" target="_blank">
              cool companies
            </a>{' '}
            doing very cool things.
          </p>
          <p className="my-5">I specialise in beautiful, accessible, helpful, and delightful digital experiences.</p>
          <p>
            With over {new Date().getFullYear() - 2016} years experience working in industry, I am well versed in
            technologies such as React, Express, Next, graphic design, and{' '}
            <a
              href="https://benjibenji.notion.site/benjibenji/307fb7f089f44301be2d9d3d8272d2ad?v=687c3dd456c747b9adb0547aeb757079"
              target="_blank"
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

        <section className="bg-light px-gutter pb-14 text-dark">
          <h1 className="mb-10 text-4xl">Blog</h1>
          {/* {blogPosts?.posts.map((post) => <BlogEntry key={post.id} {...post} />) ?? <p>Failed to load blog posts</p>} */}
        </section>
      </main>

      <footer className="px-gutter py-16 text-center">
        <p className="sm:px-24">
          Want to get in touch? I have an <a href="mailto:hi@bengrant.dev">email address</a>, or you can check out my
          other code projects on{' '}
          <a href="https://github.com/GRA0007/" target="_blank">
            Github
          </a>
          .
        </p>

        <Socials />
      </footer>
    </>
  )
}

export default Home
