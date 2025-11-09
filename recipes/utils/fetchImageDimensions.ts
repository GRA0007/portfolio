import { imageSize } from 'image-size'
import { cache } from 'react'

/** Obsidian and S3 won't give us the image dimensions, so this util fetches them all at build time */
export const fetchImageDimensions = cache(async (src: string) => {
  if (process.env.NODE_ENV === 'development') return { width: undefined, height: undefined }

  const buffer = await fetch(src).then(async (res) => {
    if (!res.ok) return
    return Buffer.from(await res.arrayBuffer())
  })
  if (!buffer) return

  return imageSize(buffer)
})
