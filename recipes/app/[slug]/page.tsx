import Link from 'next/link'
import { Suspense } from 'react'
import { Difficulty } from '/components/Difficulty'
import { Logo } from '/components/Logo'
import { StaticSearch } from '/components/Search/static'

const dbDescription = `<p>This is my classic easy cookie recipe that I make usually around once a month and it always seems to be a hit.</p><p>I usually make this recipe with double the amount of ingredients, and use 1 block of dark chocolate and 1 block of white chocolate, but if you’re making it with the quantities described below, you can either just choose one type of chocolate (I’ve listed 40% dark chocolate below which balances well with the sweetness of these cookies), or use half a block of both dark and white to get some variation.</p><p>You can also go with 70% dark chocolate if you really like dark chocolate, however my personal preference is 40-45%. I encourage you to experiment!</p><p>I recommend using kitchen scales to measure your ingredients, but I’ve included cup measurements if you need them. Please make sure you also read the notes below, especially if you are new to browning butter.</p>`

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

      <header className="grid grid-cols-[auto_1fr] gap-10 [grid-template-areas:'title_title'_'meta_image']">
        <img src="#" alt="" className="aspect-video rounded-lg bg-current/10 [grid-area:image]" />

        <h1 className="font-semibold text-4xl [grid-area:title]">The Classic Chocolate Chip Cookies</h1>

        <div className="max-w-xs [grid-area:meta]">
          <div className="sticky top-6 flex flex-col gap-5 font-meta">
            <div className="flex items-baseline justify-between gap-12">
              <span className="font-semibold">tags</span>
              <span className="text-right">
                <Link href="/?tags=cookies" className="hover:underline">
                  cookies
                </Link>
                ,{' '}
                <Link href="/?tags=sweets" className="hover:underline">
                  sweets
                </Link>
              </span>
            </div>
            <div className="flex items-center justify-between gap-12">
              <span className="font-semibold">difficulty</span>
              <Difficulty stars={3} className="size-5" />
            </div>
            <div className="flex items-baseline justify-between gap-12">
              <span className="font-semibold">quantity</span>
              <span className="text-right">25 cookies</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex justify-between gap-12">
                <span className="font-semibold">duration</span>
                <time dateTime="PT2H22M" className="text-right">
                  2h 22m
                </time>
              </div>
              <hr className="my-1 border-current/70 border-t-[1.5px]" />
              <div className="flex justify-between gap-12 text-current/70">
                <span>prep time</span>
                <span className="text-right">2h 10m</span>
              </div>
              <div className="flex justify-between gap-12 text-current/70">
                <span>cook time</span>
                <span className="text-right">12m</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/** biome-ignore lint/security/noDangerouslySetInnerHtml: Santitized from markdown */}
      <div dangerouslySetInnerHTML={{ __html: dbDescription }} className="my-12 text-lg" />
    </div>
  )
}

export default Recipe
