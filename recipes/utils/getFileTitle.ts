/** Take a path like `Recipes/My Cool Recipe.md` and strip the path and file extension to return `My Cool Recipe` */
export const getFileTitle = (path: string) => {
  const parts = path.split('/')
  return parts[parts.length - 1].split('.').slice(0, -1).join('.').trim()
}
