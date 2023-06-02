import styles from './Section.module.scss'

interface SectionProps {
  children: React.ReactNode
  light?: boolean
  style?: React.CSSProperties
}

const Section = ({ light, ...props }: SectionProps) =>
  <section className={`${styles.section} ${light ? styles.light : ''}`} {...props} />

export default Section
