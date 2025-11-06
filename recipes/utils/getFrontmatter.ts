import { VFile } from 'vfile'
import { matter } from 'vfile-matter'

/** Get the frontmatter from a markdown file as an object, and also return the file contents without the frontmatter */
export const getFrontmatter = <T extends Record<string, unknown>>(source: string) => {
  const vfile = new VFile(source)
  matter(vfile, { strip: true })
  const frontmatter = (vfile.data.matter ?? {}) as T
  return { frontmatter, markdown: String(vfile) }
}
