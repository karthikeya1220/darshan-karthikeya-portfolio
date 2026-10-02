"use client"

import { useEffect, useState } from "react"
import { useReducedMotion } from "motion/react"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { ChapterScrubber, type Chapter } from "@/components/ui/chapter-scrubber"

export const SHEETS = [
  {
    id: "overview",
    label: "Overview",
    note: "Snapshot of who I am and what I ship.",
  },
  {
    id: "contributions",
    label: "Contributions",
    note: "Open-source contributions and commit activity.",
  },
  {
    id: "hello",
    label: "About",
    note: "The longer version, beyond the résumé.",
  },
  {
    id: "stack",
    label: "Tech stack",
    note: "Languages, frameworks, and tools I use.",
  },
  {
    id: "professional-experience",
    label: "Professional experience",
    note: "Internships and roles shipped in production.",
  },
  {
    id: "college-experience",
    label: "College experience",
    note: "Lead roles and teams at IIITDM.",
  },
  {
    id: "education",
    label: "Education",
    note: "Degrees, coursework, and academic timeline.",
  },
  {
    id: "projects",
    label: "Projects",
    note: "Selected builds with live demos and source.",
  },
  { id: "awards", label: "Awards", note: "Hackathon wins and recognitions." },
  {
    id: "testimonials",
    label: "Testimonials",
    note: "What teammates and supervisors say.",
  },
  {
    id: "availability",
    label: "Availability",
    note: "Open to internships and full-time roles.",
  },
  {
    id: "terminal",
    label: "Terminal",
    note: "An interactive shell with résumé commands.",
  },
  { id: "contact", label: "Contact", note: "Every way to reach me." },
  { id: "now", label: "Now", note: "What I am focused on this month." },
  {
    id: "insights",
    label: "Insights",
    note: "Notes and write-ups from what I learn.",
  },
] as const

const CHAPTERS: Chapter[] = SHEETS.map((sheet, index) => ({
  id: sheet.id,
  title: sheet.label,
  description: sheet.note,
  meta: String(index + 1).padStart(2, "0"),
}))

/**
 * Fixed sheet register for wide viewports: a magnifying tick rail that
 * numbers every section and tracks the one crossing the viewport's reading line.
 */
export function SheetIndex() {
  const [activeId, setActiveId] = useState<string>(SHEETS[0].id)
  const reduce = useReducedMotion()
  const [click] = useClickSound()

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

  const foundIndex = SHEETS.findIndex((sheet) => sheet.id === activeId)

  return (
    <nav
      aria-label="Sheet index"
      className="fixed top-1/2 left-5 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ChapterScrubber
        label="Sheet index"
        chapters={CHAPTERS}
        currentIndex={foundIndex === -1 ? 0 : foundIndex}
        onSelect={(chapter) => {
          click()
          document.getElementById(chapter.id)?.scrollIntoView({
            behavior: reduce ? "auto" : "smooth",
            block: "start",
          })
          window.history.replaceState(null, "", `#${chapter.id}`)
        }}
      />
    </nav>
  )
}
