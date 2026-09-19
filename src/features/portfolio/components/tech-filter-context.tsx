"use client"

import { createContext, useContext, useState } from "react"

const TechFilterContext = createContext<{
  activeFilter: string | null
  setActiveFilter: (filter: string | null) => void
}>({
  activeFilter: null,
  setActiveFilter: () => {},
})

export function useTechFilter() {
  return useContext(TechFilterContext)
}

export function TechFilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  return (
    <TechFilterContext.Provider value={{ activeFilter, setActiveFilter }}>
      {children}
    </TechFilterContext.Provider>
  )
}
