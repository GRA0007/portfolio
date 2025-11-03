import { Suspense } from 'react'
import { Logo } from '/components/Logo'
import { StaticSearch } from '/components/Search/static'

const Recipe = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-16">
      <nav className="flex justify-between py-4.5 sm:py-7 md:py-11">
        <Logo />

        <Suspense>
          <StaticSearch />
        </Suspense>
      </nav>
    </div>
  )
}

export default Recipe
