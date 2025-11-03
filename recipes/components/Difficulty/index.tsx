export const Difficulty = () => {
  return (
    <div className="flex items-center gap-1.5">
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </div>
  )
}

const Star = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0L10.2062 5.79383L16 8L10.2062 10.2062L8 16L5.79383 10.2062L0 8L5.79383 5.79383L8 0Z" />
  </svg>
)
