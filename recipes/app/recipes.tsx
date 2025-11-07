'use client'

import { RecipeCard } from '/components/RecipeCard'
import { useSearchFields } from '/components/Search/useSearchFields'
import type { fetchRecipes } from '/utils/recipe'

export const Recipes = ({ recipes }: { recipes: Awaited<ReturnType<typeof fetchRecipes>> }) => {
  const { query, tags, sort, sortDir } = useSearchFields()

  return (
    <div className="grid @3xl:grid-cols-3 @lg:grid-cols-2 grid-cols-1 gap-x-6 gap-y-12">
      {recipes
        .filter((recipe) => {
          let include = true
          if (query.length > 1) {
            include = Boolean(recipe.title.includes(query) || recipe.description?.includes(query))
          }
          if (tags.length > 0 && include) {
            include = tags.every((tag) => recipe.tags.includes(tag))
          }
          return include
        })
        .toSorted((a, b) => {
          if (sortDir === 'asc') {
            if (sort === 'last-updated')
              return (a.lastEdited || a.published).valueOf() - (b.lastEdited || b.published).valueOf()
            if (sort === 'difficulty') return a.difficulty - b.difficulty
            if (sort === 'time') return (a.time?.total ?? 0) - (b.time?.total ?? 0)
            if (sort === 'alphabetical') return b.title.localeCompare(a.title)
          }
          if (sortDir === 'desc') {
            if (sort === 'last-updated')
              return (b.lastEdited || b.published).valueOf() - (a.lastEdited || a.published).valueOf()
            if (sort === 'difficulty') return b.difficulty - a.difficulty
            if (sort === 'time') return (b.time?.total ?? 0) - (a.time?.total ?? 0)
            if (sort === 'alphabetical') return a.title.localeCompare(b.title)
          }
          return 0
        })
        .map((recipe) => (
          <RecipeCard key={recipe.slug} {...recipe} />
        ))}
    </div>
  )
}
