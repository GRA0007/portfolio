/** Turns a page name into a slug like `my-cool-recipe` */
export const slugify = (name: string) => {
  return name.replace(/\s+/g, '-').toLocaleLowerCase()
}
