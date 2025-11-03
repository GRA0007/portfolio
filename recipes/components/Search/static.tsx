'use client'

import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SearchField } from './field'

export const StaticSearch = () => {
  const router = useRouter()

  return (
    <>
      <search className="hidden sm:block">
        <SearchField
          onChange={(query) => {
            router.push(`/?q=${encodeURIComponent(query)}`)
          }}
        />
      </search>

      <Link href="/?q" className="flex size-10 items-center justify-center rounded-lg border-[1.5px] sm:hidden">
        <SearchIcon className="stroke-[1.5px]" />
      </Link>
    </>
  )
}
