import { Project as ProjectProps } from '/res/projects'

import styles from './Project.module.scss'

const Project = ({ name, description, imageURL, href }: ProjectProps) =>
  <a href={href} className={styles.project}>
    <img src={imageURL} alt="" />
    <h3>{name}</h3>
    <span>{description}</span>
  </a>

export default Project
