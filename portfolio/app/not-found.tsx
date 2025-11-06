import { Nav } from '/components/Nav'

const NotFound = () => (
  <>
    <Nav />

    <main className="flex flex-1 items-center justify-center px-gutter text-center">
      <p>Sorry, but the page you're looking for couldn't be found.</p>
    </main>
  </>
)

export default NotFound
