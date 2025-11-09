import { getS3Url } from 'common/src/getS3Url'
import { env } from '/env'
import { getFileTitle } from './getFileTitle'
import { slugify } from './slugify'

/** Resolve links to relative page URLs, or S3 file URLs */
export const linkResolver = (fileName: string, objects: string[]) => {
  const normalizedName = decodeURIComponent(fileName).toLocaleLowerCase()

  const match = objects.find((path) => {
    const normalizedPath = path.toLocaleLowerCase()
    return normalizedPath.endsWith(normalizedName) || normalizedPath.endsWith(`${normalizedName}.md`)
  })

  if (!match) return
  if (match.endsWith('.md')) return `/${slugify(getFileTitle(match))}`
  return getS3Url(match, env)
}
