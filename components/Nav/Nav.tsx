import Link from 'next/link'

import styles from './Nav.module.scss'

const Nav = () =>
  <nav className={styles.nav}>
    <Link href="/">Benji</Link>
  </nav>

export default Nav
