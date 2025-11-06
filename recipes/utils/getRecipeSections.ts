import { fromMarkdown } from 'mdast-util-from-markdown'

export type Section = 'description' | 'ingredients' | 'method' | 'notes' | 'images' | 'sources'

export const getRecipeSections = (markdown: string): Record<Section | 'image', string | undefined> => {
  const tree = fromMarkdown(markdown)

  // TODO: Support all image link formats
  const image =
    tree.children[0].type === 'paragraph' &&
    tree.children[0].children[0].type === 'text' &&
    tree.children[0].children[0].value.startsWith('![')
      ? tree.children[0].children[0].value.trim().slice(3, -2)
      : undefined

  const ranges: Record<Section, { start: number; end: number } | undefined> = {
    description: undefined,
    ingredients: undefined,
    method: undefined,
    notes: undefined,
    images: undefined,
    sources: undefined,
  }

  let currentSection: keyof typeof ranges = 'description'
  for (const child of tree.children) {
    // Skip image
    if (image && child.position?.start.offset === 0) continue

    if (child.type === 'heading' && child.depth === 1) {
      if (child.children[0].type !== 'text') continue

      const headerValue = child.children[0].value.toLocaleLowerCase()
      if (Object.keys(ranges).includes(headerValue)) currentSection = headerValue as keyof typeof ranges
    } else {
      if (child.position?.start.offset === undefined || child.position.end.offset === undefined) continue

      const currentRange = ranges[currentSection]
      if (!currentRange) {
        ranges[currentSection] = { start: child.position.start.offset, end: child.position.end.offset }
      } else {
        currentRange.end = child.position.end.offset
      }
    }
  }

  return {
    image,
    description: ranges.description && markdown.slice(ranges.description.start, ranges.description.end),
    ingredients: ranges.ingredients && markdown.slice(ranges.ingredients.start, ranges.ingredients.end),
    method: ranges.method && markdown.slice(ranges.method.start, ranges.method.end),
    notes: ranges.notes && markdown.slice(ranges.notes.start, ranges.notes.end),
    images: ranges.images && markdown.slice(ranges.images.start, ranges.images.end),
    sources: ranges.sources && markdown.slice(ranges.sources.start, ranges.sources.end),
  }
}
