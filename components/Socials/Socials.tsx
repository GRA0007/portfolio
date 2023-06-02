import { SOCIAL_LINKS } from '/res/socials'

import styles from './Socials.module.scss'

const Socials = () => <ul className={styles.list}>
  {SOCIAL_LINKS.map(link => <li key={link.title}>
    <a href={link.href} target="_blank" rel="noreferrer nofollow" title={link.title}>{link.icon}</a>
  </li>)}
</ul>

export default Socials
