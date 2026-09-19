"use client"

import { useEffect, useState } from "react"

const SECTION_IDS = [
  "hello",
  "blog",
  "stack",
  "experience",
  "projects",
  "insights",
  "contact",
  "testimonials",
  "now",
]

export function useActiveSection() {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id)
      if (!el) continue

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id)
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      )

      observer.observe(el)
      observers.push(observer)
    }

    return () => {
      for (const observer of observers) {
        observer.disconnect()
      }
    }
  }, [])

  return activeId
}
