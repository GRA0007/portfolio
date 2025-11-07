import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString as mdastToString } from 'mdast-util-to-string'

/** Converts markdown into plain text */
export const stripMarkdown = (markdown: string): string => {
  const tree = fromMarkdown(markdown)
  for (const child of tree.children) {
    if (child.type === 'paragraph') child.children.push({ type: 'text', value: ' ' })
  }
  return mdastToString(tree)
}
