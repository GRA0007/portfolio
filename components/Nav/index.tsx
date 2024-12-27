import Link from 'next/link'

export const Nav = () => (
  <nav className="bg-light px-gutter py-4 text-dark">
    <Link href="/" className="focus-ring rounded-sm font-semibold text-3xl hover:underline">
      Benji
    </Link>
  </nav>
)
