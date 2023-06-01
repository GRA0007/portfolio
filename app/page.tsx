import DesignWork from '/components/DesignWork/DesignWork'
import Project from '/components/Project/Project'
import Section from '/components/Section/Section'
import Socials from '/components/Socials/Socials'
import { DESIGNWORK } from '/res/designwork'
import { PROJECTS } from '/res/projects'

import AllProjects from './AllProjects'
import styles from './page.module.scss'

const projectCards = PROJECTS.map(project => <Project key={project.name} {...project} />)

const Home = () => {
  return <>
    <header className={styles.header}>
      <h1>Hi, I’m<br />Benji</h1>
    </header>

    <main>
      <Section light>
        <p>I make websites, like this one. I am currently working for several <a href="https://www.linkedin.com/in/bengrant13/#experience-section" target="_blank" rel="noreferrer nofollow">cool companies</a> doing very cool things.</p>
        <p>I specialise in beautiful, accessible, helpful, and delightful digital experiences.</p>
        <p>With over 7 years experience working in industry, I am well versed in technologies such as React, Express, Next, graphic design, and <a href="https://benjibenji.notion.site/benjibenji/307fb7f089f44301be2d9d3d8272d2ad?v=687c3dd456c747b9adb0547aeb757079" target="_blank" rel="noreferrer nofollow">cookies</a>.</p>
        <Socials />
      </Section>
      
      <Section>
        <h2>Projects</h2>
        <div className={styles.projects}>
          {projectCards.slice(0, 4)}
          <AllProjects>{projectCards.slice(4)}</AllProjects>
        </div>
      </Section>

      <Section light>
        <h2>Design Work</h2>
      </Section>
      <Section light style={{ padding: 0 }}>
        {DESIGNWORK.map(work => <DesignWork key={work.name} {...work} />)}
      </Section>

      <Section light>
        <h2>Blog</h2>
      </Section>
    </main>

    <footer className={styles.footer}>
      <p>Want to get in touch? I have an <a href="mailto:hi@bengrant.dev">email address</a>, or you can check out my other code projects on <a href="https://github.com/GRA0007/" target="_blank" rel="noreferrer nofollow">Github</a>.</p>
      <Socials />
    </footer>
  </>
}

export default Home
