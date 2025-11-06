import Link from 'next/link'

export const Logo = ({ isHeading }: { isHeading?: boolean }) => {
  const Text = isHeading ? 'h1' : 'span'

  return (
    <Link href="/" className="flex items-center hover:underline">
      <svg
        className="mr-4 size-6 shrink-0 sm:size-8"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19.5889 9.42578L25 7L22.5732 12.4102L32 16L22.5732 19.5889L25 25L19.5889 22.5732L16 32L12.4102 22.5732L7 25L9.42578 19.5889L0 16L9.42578 12.4102L7 7L12.4102 9.42578L16 0L19.5889 9.42578Z" />
      </svg>

      <Text className="font-bold text-xl sm:text-2xl">Benji’s Recipes</Text>
    </Link>
  )
}
