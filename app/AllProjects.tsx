'use client'

import { useState } from 'react'

import ButtonLink from '/components/ButtonLink/ButtonLink'

import styles from './page.module.scss'

const AllProjects = ({ children }: { children: React.ReactNode }) => {
  const [showAll, setShowAll] = useState(false)

  return showAll
    ? <>{children}</>
    : <div className={styles.seeAll}>
      <ButtonLink onClick={() => setShowAll(true)}>See all projects</ButtonLink>
    </div>
}

export default AllProjects
