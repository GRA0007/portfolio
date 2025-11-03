'use client'

import { cn } from 'common/src/cn'
import { ArrowUpIcon } from 'lucide-react'
import { SearchField } from './field'
import { SORTS, useSearchFields } from './useSearchFields'

const DB_TAGS = ['breakfast', 'lunch', 'dinner', 'sweets', 'cookies', 'icing', 'vegan', 'gluten-free']

export const Search = () => {
  const { query, tags, sort, sortDir, rawSortDir, setQuery, setTags, setSort, setSortDir } = useSearchFields()

  return (
    <search className="py-6 [grid-area:search] sm:py-8 md:py-11">
      <SearchField value={query} onChange={setQuery} />

      <fieldset className="mt-12">
        <legend className="mb-4 font-semibold text-xl">filter by tag</legend>

        <div className="flex flex-col items-start gap-1">
          {DB_TAGS.map((tag) => (
            <label
              key={tag}
              className="cursor-pointer font-meta transition-transform hover:translate-x-1 has-checked:font-semibold has-checked:underline"
            >
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
              className="flex cursor-pointer items-center font-meta transition-transform hover:translate-x-1 has-checked:font-semibold has-checked:underline"
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
                  if (sort === 'last-updated' && s === 'last-updated' && rawSortDir === 'asc') return setSortDir(null)

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

      {(query !== '' || tags.length > 0 || sort !== 'last-updated' || rawSortDir) && (
        <button
          type="button"
          onClick={() => {
            setQuery('')
            setTags([])
            setSort('last-updated')
            setSortDir(null)
          }}
          className="hover:-translate-y-[3px] hover:active:-translate-y-px mt-8 cursor-pointer rounded-lg border-[1.5px] px-4 py-1 shadow-[0_0] transition-[box-shadow,translate] hover:shadow-[0_3px] hover:active:shadow-[0_1px]"
        >
          reset
        </button>
      )}
    </search>
  )
}
