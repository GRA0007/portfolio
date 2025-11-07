import { getS3Url } from 'common/src/getS3Url'
import { env } from '/env'
import { getFileTitle } from './getFileTitle'
import { slugify } from './slugify'

/** Resolve wiki links to relative page URLs, or S3 file URLs */
export const wikiLinkResolver = (fileName: string, objects: string[]) => {
  const match = objects.find(
    (path) =>
      path.toLocaleLowerCase().endsWith(fileName.toLocaleLowerCase()) ||
      path.toLocaleLowerCase().endsWith(`${fileName.toLocaleLowerCase()}.md`),
  )
  if (!match) return
  if (match.endsWith('.md')) return `/${slugify(getFileTitle(match))}`
  return getS3Url(match, env)
}
