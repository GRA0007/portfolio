import { cn } from 'common/src/cn'

export const Difficulty = ({ stars, className }: { stars: number; className?: string }) => {
  return (
    <div className="flex items-center gap-1.5" title={`difficulty of ${stars} star${stars === 1 ? '' : 's'}`}>
      <Star className={cn(className, stars < 1 && 'opacity-50')} aria-hidden="true" />
      <Star className={cn(className, stars < 2 && 'opacity-50')} aria-hidden="true" />
      <Star className={cn(className, stars < 3 && 'opacity-50')} aria-hidden="true" />
      <Star className={cn(className, stars < 4 && 'opacity-50')} aria-hidden="true" />
      <Star className={cn(className, stars < 5 && 'opacity-50')} aria-hidden="true" />
    </div>
  )
}

const Star = (props: React.ComponentProps<'svg'>) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M8 0L10.2062 5.79383L16 8L10.2062 10.2062L8 16L5.79383 10.2062L0 8L5.79383 5.79383L8 0Z" />
  </svg>
)
