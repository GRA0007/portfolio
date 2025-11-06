import { getS3Url } from 'common/src/getS3Url'
import { env } from '/env'
import { getPageName } from '/utils/getPageName'
import { slugify } from '/utils/slugify'

export const wikiLinkResolver = (filename: string, objects: string[]) => {
  const match = objects.find(
    (path) =>
      path.toLocaleLowerCase().endsWith(filename.toLocaleLowerCase()) ||
      path.toLocaleLowerCase().endsWith(`${filename.toLocaleLowerCase()}.md`),
  )
  if (!match) return '/404'
  if (match.endsWith('.md')) return `/${slugify(getPageName(match))}`
  return getS3Url(match, env)
}
