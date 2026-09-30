"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const SHEETS = [
  { id: "overview", label: "Overview" },
  { id: "contributions", label: "Contributions" },
  { id: "hello", label: "About" },
  { id: "stack", label: "Tech stack" },
  { id: "professional-experience", label: "Professional experience" },
  { id: "college-experience", label: "College experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "awards", label: "Awards" },
  { id: "testimonials", label: "Testimonials" },
  { id: "availability", label: "Availability" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
  { id: "now", label: "Now" },
  { id: "insights", label: "Insights" },
] as const

/**
 * Fixed sheet register for wide viewports: numbers every section and
 * tracks the one crossing the viewport's reading line.
 */
export function SheetIndex() {
  const [activeId, setActiveId] = useState<string>(SHEETS[0].id)
  const reduce = useReducedMotion()

  useEffect(() => {
    const sections = SHEETS.map((sheet) =>
      document.getElementById(sheet.id)
    ).filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        }
      },
      { rootMargin: "-38% 0px -58% 0px", threshold: 0 }
    )

    for (const section of sections) observer.observe(section)
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sheet index"
      className="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ol className="border-l border-line">
        {SHEETS.map((sheet, index) => {
          const active = sheet.id === activeId

          return (
            <li key={sheet.id}>
              <a
                href={`#${sheet.id}`}
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(sheet.id)?.scrollIntoView({
                    behavior: reduce ? "auto" : "smooth",
                    block: "start",
                  })
                  window.history.replaceState(null, "", `#${sheet.id}`)
                }}
                className={cn(
                  "group flex items-center gap-2 px-2 py-[3px] font-mono text-[10px]/none tabular-nums transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground/45 hover:text-muted-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-px shrink-0 transition-all duration-300",
                    active ? "w-3.5 bg-foreground" : "w-1.5 bg-line"
                  )}
                  aria-hidden
                />
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:max-w-44 group-hover:opacity-100 group-focus-visible:max-w-44 group-focus-visible:opacity-100">
                  {sheet.label}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
