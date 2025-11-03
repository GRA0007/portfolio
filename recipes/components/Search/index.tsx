'use client'

import { cn } from 'common/src/cn'
import { ArrowUpIcon } from 'lucide-react'
import { parseAsArrayOf, parseAsString, parseAsStringLiteral, useQueryState } from 'nuqs'
import { SearchField } from './field'

const DB_TAGS = ['breakfast', 'lunch', 'dinner', 'sweets', 'cookies', 'icing', 'vegan', 'gluten-free']
const SORTS = ['last-updated', 'difficulty', 'time', 'alphabetical'] as const

export const Search = () => {
  const [query, setQuery] = useQueryState('q', parseAsString.withDefault(''))
  const [tags, setTags] = useQueryState('tags', parseAsArrayOf(parseAsString).withDefault([]))
  const [sort, setSort] = useQueryState('sort', parseAsStringLiteral(SORTS).withDefault('last-updated'))
  const [_sortDir, setSortDir] = useQueryState('dir', parseAsStringLiteral(['asc', 'desc']))

  const sortDir = _sortDir ?? (sort === 'last-updated' ? 'desc' : 'asc')

  return (
    <search className="py-6 [grid-area:search] sm:py-8 md:py-11">
      <SearchField value={query} onChange={setQuery} />

      <fieldset className="mt-10">
        <legend className="mb-4 font-semibold text-xl">filter by tag</legend>

        <div className="flex flex-col items-start gap-1">
          {DB_TAGS.map((tag) => (
            <label key={tag} className="cursor-pointer font-meta has-checked:font-semibold has-checked:underline">
              <input
                type="checkbox"
                name="tags"
                className="size-0 appearance-none opacity-0"
                checked={tags.includes(tag)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setTags((old) => [...old, tag])
                  } else {
                    setTags((old) => old.filter((t) => t !== tag))
                  }
                }}
              />
              {tag}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="mb-4 font-semibold text-xl">sort</legend>

        <div className="flex flex-col items-start gap-1">
          {SORTS.map((s) => (
            <label
              key={s}
              className="flex cursor-pointer items-center font-meta has-checked:font-semibold has-checked:underline"
            >
              <input
                type="radio"
                name="sort"
                className="size-0 appearance-none opacity-0"
                checked={sort === s}
                onChange={() => {
                  setSort(s)
                  setSortDir('asc')
                }}
                onClick={() => {
                  if (sort === 'last-updated' && s === 'last-updated' && _sortDir === 'asc') return setSortDir(null)

                  if (sort === s) setSortDir(sortDir === 'desc' ? 'asc' : 'desc')
                }}
              />
              {s.replaceAll('-', ' ')}
              {sort === s && (
                <div className="ml-2" title={sortDir === 'asc' ? 'ascending' : 'descending'}>
                  <ArrowUpIcon
                    className={cn('size-4 stroke-3', sortDir === 'desc' && 'rotate-180')}
                    aria-hidden="true"
                  />
                </div>
              )}
            </label>
          ))}
        </div>
      </fieldset>
    </search>
  )
}
