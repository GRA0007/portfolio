/** Format a date like `May 23, 2021` */
export const formatDate = (from: Date) => {
  return from.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
