import styles from './Section.module.scss'

interface SectionProps {
  children: React.ReactNode
  light?: boolean
}

export const Section = ({ light, ...props }: SectionProps) =>
  <section className={`${styles.section} ${light ? styles.light : ''}`} {...props} />
