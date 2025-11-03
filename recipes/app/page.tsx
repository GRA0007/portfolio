import { Suspense } from 'react'
import { Logo } from '/components/Logo'
import { Search } from '/components/Search'

const Home = () => {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-7xl grid-cols-[1fr_auto] grid-rows-[auto_1fr] px-6 [grid-template-areas:'nav_search'_'results_search'] md:grid md:px-16">
      <nav className="flex pt-6 [grid-area:nav] sm:pt-8 md:py-12">
        <Logo isHeading />
      </nav>

      <Suspense>
        <Search />
      </Suspense>

      <div className="[grid-area:results]">
        <p>Results...</p>
      </div>
    </div>
  )
}

export default Home
