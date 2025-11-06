import { CheckIcon } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import type { Recipe, WithContext } from 'schema-dts'
import { Difficulty } from '/components/Difficulty'
import { Logo } from '/components/Logo'
import { StaticSearch } from '/components/Search/static'
import { getRecipe } from '/utils/recipe'

const dbDescription = `<p>This is my classic easy cookie recipe that I make usually around once a month and it always seems to be a hit.</p><p>I usually make this recipe with double the amount of ingredients, and use 1 block of dark chocolate and 1 block of white chocolate, but if you’re making it with the quantities described below, you can either just choose one type of chocolate (I’ve listed 40% dark chocolate below which balances well with the sweetness of these cookies), or use half a block of both dark and white to get some variation.</p><p>You can also go with 70% dark chocolate if you really like dark chocolate, however my personal preference is 40-45%. I encourage you to experiment!</p><p>I recommend using kitchen scales to measure your ingredients, but I’ve included cup measurements if you need them. Please make sure you also read the notes below, especially if you are new to browning butter.</p>`

type Props = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params

  return {
    title: 'The Classic Chocolate Chip Cookies',
    description: dbDescription.slice(0, 150),
    keywords: ['benji', 'recipe', 'collection'],
    alternates: {
      canonical: '/the-classic-chocolate-chip-cookies',
    },
    openGraph: {
      images: {
        url: '#',
        width: 0,
        height: 0,
      },
    },
  }
}

const RecipePage = async ({ params }: Props) => {
  const { slug } = await params
  const recipe = await getRecipe(slug)
  if (!recipe) notFound()

  return (
    <div className="mx-auto w-full max-w-7xl px-6 md:px-16">
      <nav className="flex justify-between py-4.5 sm:py-7 md:py-11">
        <Logo />
        <StaticSearch />
      </nav>

      <header className="grid grid-cols-1 gap-6 xs:gap-10 [grid-template-areas:'image'_'title'_'meta'] md:grid-cols-[auto_1fr] md:[grid-template-areas:'title_title'_'meta_image']">
        <img src={recipe.image ?? '#'} alt="" className="rounded-lg bg-current/10 [grid-area:image]" />

        <h1 className="font-semibold text-2xl xs:text-3xl [grid-area:title] sm:text-4xl">{recipe.title}</h1>

        <div className="text-sm xs:text-base [grid-area:meta] md:max-w-xs">
          <div className="sticky top-6 flex flex-col gap-5 font-meta">
            {recipe.tags.length > 0 && (
              <div className="flex items-baseline justify-between gap-4 xs:gap-12">
                <span className="font-semibold">tags</span>
                <span className="text-right">
                  {recipe.tags.map((tag, i) => (
                    <Fragment key={tag}>
                      <Link href={`/?tags=${tag}`} className="hover:underline">
                        {tag}
                      </Link>
                      {i !== recipe.tags.length - 1 && ', '}
                    </Fragment>
                  ))}
                </span>
              </div>
            )}
            <div className="flex items-center justify-between gap-4 xs:gap-12">
              <span className="font-semibold">difficulty</span>
              <Difficulty stars={recipe.difficulty} />
            </div>
            {recipe.makes && (
              <div className="flex items-baseline justify-between gap-4 xs:gap-12">
                <span className="font-semibold">quantity</span>
                <span className="text-right">{recipe.makes}</span>
              </div>
            )}
            {recipe.time && (
              <div className="flex flex-col gap-0.5">
                <div className="flex justify-between gap-4 xs:gap-12">
                  <span className="font-semibold">duration</span>
                  <time dateTime="PT2H22M" className="text-right">
                    {recipe.time.total}
                  </time>
                </div>
                <hr className="my-1 border-current/70 border-t-[1.5px]" />
                {recipe.time.parts.map((part) => (
                  <div key={part.name} className="flex justify-between gap-4 xs:gap-12 text-current/70">
                    <span>{part.name} time</span>
                    <span className="text-right">{part.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="recipe-content mb-16">
        <div className="xs:my-12 mt-6 mb-8 xs:text-lg">{recipe.content.description}</div>

        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex-2">
            <section className="sticky top-6 xs:text-lg">
              <h2 className="mb-4 font-semibold text-xl">ingredients</h2>

              {recipe.content.ingredients}
            </section>
          </div>

          <div className="flex-3">
            <div className="sticky top-6">
              <section className="xs:text-lg">
                <h2 className="mb-4 font-semibold text-xl">method</h2>

                {recipe.content.method}
              </section>

              {recipe.content.notes && (
                <section className="mt-12 xs:text-lg">
                  <h2 className="mb-4 font-semibold text-xl">notes</h2>

                  {recipe.content.notes}
                </section>
              )}
            </div>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 font-semibold text-xl">images</h2>

          <div className="grid grid-cols-1 xs:grid-cols-2 gap-x-6 gap-y-6 text-sm sm:gap-x-10 sm:text-base">
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">The mixture can be quite runny</p>
            </div>
            <div>
              <img src="#" alt="" className="aspect-video rounded-lg bg-current/10" />
              <p className="mt-1">Another cool photo of this cool cool recipe</p>
            </div>
          </div>
        </section>

        {recipe.content.sources && (
          <section className="mt-12">
            <h2 className="mb-4 font-semibold text-xl">sources</h2>

            <div className="break-all font-meta text-sm xs:text-base">{recipe.content.sources}</div>
          </section>
        )}
      </main>

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: statically defined schema
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Recipe',
            author: {
              '@id': 'https://bengrant.dev#author',
              '@type': 'Person',
              givenName: 'Benji',
              familyName: 'Grant',
              email: 'hi@bengrant.dev',
              url: 'https://bengrant.dev',
            },
            name: 'The Classic Chocolate Chip Cookies',
            prepTime: 'PT2H10M',
            cookTime: 'PT12M',
            totalTime: 'PT2H22M',
            recipeYield: '25 cookies',
            recipeCategory: 'cookies',
            recipeIngredient: ['2 1/4 cups (280g) plain flour'],
            recipeInstructions: ['instruction 1'],
            datePublished: '',
            dateModified: '',
            description: dbDescription,
            image: '#',
            isAccessibleForFree: true,
            keywords: '',
            url: '',
          } satisfies WithContext<Recipe>),
        }}
      />
    </div>
  )
}

export default RecipePage
