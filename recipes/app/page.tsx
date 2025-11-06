import { Suspense } from 'react'
import { Logo } from '/components/Logo'
import { RecipeCard } from '/components/RecipeCard'
import { Search } from '/components/Search'
import { fetchRecipes } from '/utils/recipe'

const Home = async () => {
  const recipes = await fetchRecipes()

  return (
    <div className="mx-auto w-full max-w-7xl grid-cols-[1fr_auto] grid-rows-[auto_1fr] gap-x-10 px-6 [grid-template-areas:'nav_search'_'results_search'] md:grid md:px-16">
      <nav className="flex pt-6 [grid-area:nav] sm:pt-8 md:py-12">
        <Logo isHeading />
      </nav>

      <Suspense>
        <Search />
      </Suspense>

      <main className="[grid-area:results]">
        <div className="grid grid-cols-3 gap-x-6 gap-y-12">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.slug} {...recipe} />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
