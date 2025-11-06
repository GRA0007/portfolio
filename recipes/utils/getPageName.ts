/** Take a path like `Recipes/My Cool Recipe.md` and strip the path and file extension to return `My Cool Recipe` */
export const getPageName = (filename: string) => {
  const nameParts = filename.split('/')
  return nameParts[nameParts.length - 1].slice(0, -3).trim()
}
