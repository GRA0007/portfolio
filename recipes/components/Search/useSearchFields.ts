import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'

export const SORTS = ['last-updated', 'difficulty', 'time', 'alphabetical'] as const

export const useSearchFields = () => {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
  const [tags, setTags] = useQueryState('tags', parseAsArrayOf(parseAsString).withDefault([]))
  const [sort, setSort] = useQueryState('sort', parseAsStringLiteral(SORTS).withDefault('last-updated'))
  const [rawSortDir, setSortDir] = useQueryState('dir', parseAsStringLiteral(['asc', 'desc']))

  return {
    query,
    tags,
    sort,
    rawSortDir,
    sortDir: rawSortDir ?? (sort === 'last-updated' ? 'desc' : 'asc'),
    setQuery,
    setTags,
    setSort,
    setSortDir,
  }
}
