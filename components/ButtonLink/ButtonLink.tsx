import styles from './ButtonLink.module.scss'

const ButtonLink = (props: React.ComponentProps<'button'>) =>
  <button type="button" className={styles.link} {...props} />

export default ButtonLink
