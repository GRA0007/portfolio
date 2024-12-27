'use client'

import { useState } from 'react'

export const AllProjects = ({ children }: { children: React.ReactNode }) => {
  const [showAll, setShowAll] = useState(false)

  return showAll ? (
    <>{children}</>
  ) : (
    <div className="col-span-full mt-8 mb-4 text-center">
      <button
        type="button"
        className="hover:-translate-y-0.5 link cursor-pointer transition-transform"
        onClick={() => {
          setShowAll(true)
        }}
      >
        See all projects
      </button>
    </div>
  )
}
