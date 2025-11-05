import Link from 'next/link'
import { useId } from 'react'
import { Difficulty } from '/components/Difficulty'

export const RecipeCard = () => {
  const id = useId()

  return (
    <Link href="/the-classic-chocolate-chip-cookies" className="hover:-translate-y-1 group transition-transform">
      <article aria-labelledby={id}>
        <img src="#" alt="" className="aspect-video h-auto w-full rounded-lg bg-current/10 object-cover" />
        <h2 id={id} className="my-3 font-semibold text-2xl group-hover:underline">
          The Classic Chocolate Chip Cookies
        </h2>
        <div className="flex items-center gap-4">
          <Difficulty stars={3} onCard />
          <time dateTime="PT2H22M" title="time" className="whitespace-nowrap font-meta text-sm">
            2h 22m
          </time>
        </div>
        <p className="mt-2 font-meta text-sm" title="tags">
          cookies, sweets
        </p>
      </article>
    </Link>
  )
}
