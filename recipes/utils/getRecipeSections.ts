import { fromMarkdown } from 'mdast-util-from-markdown'
import * as wikiLink from '/utils/wikiLink'

type RecipeImage = { src: string; alt: string | undefined; caption: string | undefined }
export type Section = 'description' | 'ingredients' | 'method' | 'notes' | 'images' | 'sources'

export const getRecipeSections = (
  markdown: string,
): Record<Section, string | undefined> & { image: RecipeImage | undefined } => {
  const tree = fromMarkdown(markdown, {
    extensions: [wikiLink.syntax()],
    mdastExtensions: [wikiLink.fromMarkdown()],
  })

  let image: RecipeImage | undefined
  if (tree.children[0].type === 'paragraph' && tree.children[0].children[0]?.type === 'image') {
    image = {
      src: tree.children[0].children[0].url,
      alt: tree.children[0].children[0].alt || undefined,
      caption: tree.children[0].children[0].title || undefined,
    }
  }

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
    description:
      ranges.description && (markdown.slice(ranges.description.start, ranges.description.end).trim() || undefined),
    ingredients:
      ranges.ingredients && (markdown.slice(ranges.ingredients.start, ranges.ingredients.end).trim() || undefined),
    method: ranges.method && (markdown.slice(ranges.method.start, ranges.method.end).trim() || undefined),
    notes: ranges.notes && (markdown.slice(ranges.notes.start, ranges.notes.end).trim() || undefined),
    images: ranges.images && (markdown.slice(ranges.images.start, ranges.images.end).trim() || undefined),
    sources: ranges.sources && (markdown.slice(ranges.sources.start, ranges.sources.end).trim() || undefined),
  }
}
