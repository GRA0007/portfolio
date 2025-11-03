import { Difficulty } from '/components/Difficulty'

export const RecipeCard = () => {
  return (
    <article>
      <img src="#" alt="" className="aspect-video h-auto w-full rounded-lg bg-current/10 object-cover" />
      <h2 className="my-3 font-semibold text-2xl">The Classic Chocolate Chip Cookies</h2>
      <div className="flex items-center gap-4">
        <Difficulty />
        <time dateTime="PT2H22M" className="whitespace-nowrap font-meta text-sm">
          2h 22m
        </time>
      </div>
      <p className="mt-2 font-meta text-sm">cookies, sweets</p>
    </article>
  )
}
