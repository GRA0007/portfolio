import Link from 'next/link'

export const Nav = () => (
  <nav className="bg-light px-gutter py-4 text-dark">
    <Link href="/" className="!no-underline hover:!underline font-semibold text-3xl">
      Benji
    </Link>
  </nav>
)
