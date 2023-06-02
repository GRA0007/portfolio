import { DesignWork as DesignWorkProps } from '/res/designwork'

import styles from './DesignWork.module.scss'

const DesignWork = ({ name, imageURL, href }: DesignWorkProps) =>
  <a href={href} className={styles.designWork}>
    <img src={imageURL} alt="" />

    <span>{name}</span>

    <svg viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M42.5 17.7083L67.2917 42.4999L42.5 67.2916M17.7083 42.4999H67.2917H17.7083Z" stroke="currentColor" />
    </svg>
  </a>

export default DesignWork
