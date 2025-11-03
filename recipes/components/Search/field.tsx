import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const SearchField = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  const [internalValue, setInternalValue] = useState(value)

  // Keep internal value in sync with value
  useEffect(() => {
    setInternalValue((i) => (i !== value ? value : i))
  }, [value])

  // Debounce input field
  useEffect(() => {
    // Reset immediately if cleared
    if (internalValue === '') {
      onChange('')
      return
    }

    const updateValue = setTimeout(() => {
      onChange(internalValue)
    }, 300)
    return () => {
      clearTimeout(updateValue)
    }
  }, [internalValue, onChange])

  return (
    <div className="relative">
      <input
        type="search"
        className="h-10 rounded-lg border-[1.5px] pr-2 pl-10 leading-0 sm:text-lg"
        name="q"
        placeholder="search"
        value={internalValue}
        onChange={(e) => {
          setInternalValue(e.currentTarget.value)
        }}
        minLength={2}
        maxLength={50}
      />
      <SearchIcon className="pointer-events-none absolute top-2 left-2 size-6 stroke-[1.5px]" />
    </div>
  )
}
