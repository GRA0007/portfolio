import { Suspense } from 'react'
import { Logo } from '/components/Logo'
import { Search } from '/components/Search'
import { fetchRecipes } from '/utils/recipe'
import { Recipes } from './recipes'

const getSupportedTags = (recipes: Awaited<ReturnType<typeof fetchRecipes>>) => {
  const tags = []
  for (const recipe of recipes) tags.push(...recipe.tags)
  return [...new Set(tags)].sort((a, b) => a.localeCompare(b))
}

const Home = async () => {
  const recipes = await fetchRecipes()

  return (
    <div className="mx-auto w-full max-w-7xl grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-10 px-6 [grid-template-areas:'nav_search'_'results_search'] md:grid md:px-16">
      <nav className="flex pt-6 [grid-area:nav] sm:pt-8 md:py-12">
        <Logo isHeading />
      </nav>

      <Suspense>
        <Search supportedTags={getSupportedTags(recipes)} />
      </Suspense>

      <main className="@container [grid-area:results]">
        <Suspense>
          <Recipes recipes={recipes} />
        </Suspense>
      </main>
    </div>
  )
}

export default Home
