import Link from 'next/link'
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

        <StaticSearch />
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

      <main className="mb-16">
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Santitized from markdown
          dangerouslySetInnerHTML={{ __html: dbDescription }}
          className="my-12 text-lg [&_p:not(:last-child)]:mb-5"
        />

        <div className="flex gap-10">
          <div className="flex-2">
            <section className="sticky top-6 text-lg">
              <h2 className="mb-4 font-semibold text-xl">ingredients</h2>

              <ul>
                <li>2 1/4 cups (280g) plain flour</li>
                <li>1/2 tsp baking soda</li>
                <li>1 1/2 tsp cornflour</li>
                <li>1/2 tsp salt</li>
                <li>170g unsalted butter, melted (200g if browning)</li>
                <li>3/4 cup (150g) brown sugar</li>
                <li>1/2 cup (100g) caster sugar</li>
                <li>1 egg + 1 egg yolk</li>
                <li>2 tsp vanilla extract</li>
                <li>180g dark chocolate, chopped roughly</li>
              </ul>
            </section>
          </div>

          <div className="flex-3">
            <section className="text-lg">
              <h2 className="mb-4 font-semibold text-xl">method</h2>

              <ol>
                <li>
                  Mix together the flour, baking soda, cornflour, and salt together in a small bowl, and set aside.
                </li>
                <li>
                  In a large bowl, mix together the melted butter and sugars until no lumps remain. Whisk in the egg,
                  and then the egg yolk, and then the vanilla extract.
                </li>
                <li>
                  Mix the dry ingredients into the wet ingredients until combined, then fold in the chocolate. Cover the
                  bowl with plastic wrap and refrigerate for at least 2 hours, up to 3 days.
                </li>
                <li>Preheat the oven to 160 C (140 C fan-forced), and line a tray with baking paper.</li>
                <li>
                  Roll mixture into balls, about 3 tbsp each, and place apart on the tray. Bake for 12-14 minutes, then
                  cool for 10 minutes before transferring to a wire rack.
                </li>
              </ol>
            </section>
            <section className="mt-12 text-lg">
              <h2 className="mb-4 font-semibold text-xl">notes</h2>

              <ul>
                <li>
                  When browning the butter, you’ll want to keep going until the butter turns a deep dark brown colour,
                  like a dark beer, which should take between 10-15 minutes. It may take a while but I’d recommend not
                  turning the heat up too high as once it starts to brown it will happen very quickly.
                </li>
                <li>
                  If you do put the dough in the fridge overnight before baking (recommended), take it out an hour or so
                  before you bake it the next day so it’s not too difficult to scoop.
                </li>
                <li>
                  I also like to sprinkle some flakey salt on top of the cookies before baking; I recommend Maldon
                  diamond crystal salt, but any flakey salt will do.
                </li>
              </ul>
            </section>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 font-semibold text-xl">images</h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">The mixture can be quite runny</p>
            </div>
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">Another cool photo of this cool cool recipe</p>
            </div>
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">The mixture can be quite runny</p>
            </div>
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">Another cool photo of this cool cool recipe</p>
            </div>
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">The mixture can be quite runny</p>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 font-semibold text-xl">sources</h2>

          <ul className="font-meta">
            <li>https://sallysbakingaddiction.com/chewy-chocolate-chip-cookies/</li>
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Recipe
