import Link from 'next/link'
import { useId } from 'react'
import { Difficulty } from '/components/Difficulty'
import { formatDuration } from '/utils/formatDuration'

export const RecipeCard = ({
  slug,
  image,
  title,
  difficulty,
  time,
  tags,
}: {
  slug: string
  image: string | null
  title: string
  difficulty: number
  time: { total: number } | null
  tags: string[]
}) => {
  const id = useId()

  return (
    <Link href={`/${slug}`} className="hover:-translate-y-1 group transition-transform">
      <article aria-labelledby={id}>
        <img src={image ?? '#'} alt="" className="aspect-video h-auto w-full rounded-lg bg-current/10 object-cover" />
        <h2 id={id} className="my-3 font-semibold text-2xl group-hover:underline">
          {title}
        </h2>
        <div className="flex items-center gap-4">
          <Difficulty stars={difficulty} onCard />
          {time && (
            <time
              dateTime={formatDuration(time.total, 'ISO')}
              title="time"
              className="whitespace-nowrap font-meta text-sm"
            >
              {formatDuration(time.total)}
            </time>
          )}
        </div>
        <p className="mt-2 font-meta text-sm" title="tags">
          {tags.join(', ')}
        </p>
      </article>
    </Link>
  )
}
