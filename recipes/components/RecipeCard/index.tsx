import Link from 'next/link'
import { useId } from 'react'
import { Difficulty } from '/components/Difficulty'
import { formatDuration } from '/utils/formatDuration'
import type { fetchRecipes } from '/utils/recipe'

export const RecipeCard = ({ slug, image, title, meta }: Awaited<ReturnType<typeof fetchRecipes>>[number]) => {
  const id = useId()

  return (
    <Link href={`/${slug}`} className="hover:-translate-y-1 group transition-transform">
      <article aria-labelledby={id}>
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          className="aspect-85/64 h-auto w-full rounded-lg bg-current/10 object-cover"
        />
        <h2 id={id} className="my-3 font-semibold text-2xl group-hover:underline">
          {title}
        </h2>
        {(meta.difficulty || meta.time) && (
          <div className="flex items-center gap-4">
            {meta.difficulty && <Difficulty stars={meta.difficulty} onCard />}
            {meta.time && (
              <time
                dateTime={formatDuration(meta.time.total, 'ISO')}
                title={`Duration of ${formatDuration(meta.time.total, 'long')}`}
                className="whitespace-nowrap font-meta text-sm"
              >
                {formatDuration(meta.time.total)}
              </time>
            )}
          </div>
        )}
        <p className="mt-2 font-meta text-sm" title="Tags">
          {meta.tags.join(', ')}
        </p>
      </article>
    </Link>
  )
}
