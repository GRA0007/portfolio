import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'
import type { Recipe, WithContext } from 'schema-dts'
import { Difficulty } from '/components/Difficulty'
import { Logo } from '/components/Logo'
import { StaticSearch } from '/components/Search/static'
import { getRecipe } from '/utils/recipe'

type Props = { params: Promise<{ slug: string }> }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { slug } = await params
  const recipe = await getRecipe(slug)
  if (!recipe) notFound()

  return {
    title: recipe.title,
    description: recipe.description,
    keywords: ['benji', 'recipe', 'collection', ...recipe.tags],
    alternates: {
      canonical: `/${recipe.slug}`,
    },
    openGraph: {
      images: recipe.image ?? undefined,
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
            name: recipe.title,
            prepTime: 'PT2H10M', // TODO:
            cookTime: 'PT12M',
            totalTime: 'PT2H22M',
            recipeYield: recipe.makes || undefined,
            recipeCategory: recipe.tags.length > 0 ? recipe.tags[0] : undefined,
            datePublished: recipe.published.toISOString(),
            dateModified: recipe.lastEdited ? recipe.lastEdited.toISOString() : undefined,
            description: recipe.description,
            image: recipe.image ?? undefined,
            isAccessibleForFree: true,
            keywords: recipe.tags,
            url: `https://recipes.bengrant.dev/${recipe.slug}`,
          } satisfies WithContext<Recipe>),
        }}
      />
    </div>
  )
}

export default RecipePage
