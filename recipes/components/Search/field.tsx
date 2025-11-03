import { SearchIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export const SearchField = ({
  value,
  onChange,
  autoFocus,
}: {
  value?: string
  onChange: (value: string) => void
  autoFocus?: boolean
}) => {
  const [internalValue, setInternalValue] = useState(value ?? '')
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null)

  // Keep internal value in sync with value
  useEffect(() => {
    if (value !== undefined) setInternalValue((i) => (i !== value ? value : i))
  }, [value])

  return (
    <div className="relative">
      <input
        type="search"
        className="h-10 rounded-lg border-[1.5px] pr-2 pl-10 leading-0 sm:text-lg"
        name="q"
        placeholder="search"
        value={internalValue}
        onChange={(e) => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)

          const currentValue = e.currentTarget.value
          setInternalValue(currentValue)

          // Reset immediately if cleared
          if (currentValue === '') onChange('')

          // Debounce change event
          timeoutRef.current = setTimeout(() => onChange(currentValue), 300)
        }}
        minLength={2}
        maxLength={50}
        // biome-ignore lint/a11y/noAutofocus: Autofocus if filled
        autoFocus={autoFocus}
      />
      <SearchIcon className="pointer-events-none absolute top-2 left-2 size-6 stroke-[1.5px]" />
    </div>
  )
}
