import Nav from '/components/Nav/Nav'
import Section from '/components/Section/Section'

const NotFound = () =>
  <>
    <Nav />
    <Section style={{ flex: 1, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p>Sorry, but the page you're looking for couldn't be found.</p>
    </Section>
  </>

export default NotFound
