/** Format a date like `May 23, 2021` */
export const formatDate = (from: string | undefined) => {
  if (!from) return
  return new Date(from).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
