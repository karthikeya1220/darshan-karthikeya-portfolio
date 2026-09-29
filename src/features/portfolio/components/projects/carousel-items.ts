import type { CarouselItem } from "@/components/ui/connected-carousel"
import { PROJECTS } from "@/features/portfolio/data/projects"

/** Fallback headline stats for projects without `metrics`. */
const STAT_OVERRIDES: Record<string, string> = {
  marketglimpse: "Real-time stock analytics",
  getit: "AI-matched freelance marketplace",
}

function statFor(
  id: string,
  title: string,
  metric?: { value: string; label: string }
): string {
  if (metric) return `${metric.value} ${metric.label}`
  return STAT_OVERRIDES[id] ?? title
}

function periodLabel(period: { start: string; end?: string }): string {
  return `${period.start} — ${period.end ?? "Present"}`
}

/** First paragraph of the description (before the bullet list). */
function quoteFor(description?: string): string {
  return description?.split("\n")[0] ?? ""
}

export const CAROUSEL_ITEMS: CarouselItem[] = PROJECTS.map((project) => {
  const stat = statFor(project.id, project.title, project.metrics?.[0])

  return {
    id: project.id,
    stat,
    quote: quoteFor(project.description),
    author: project.title,
    role: periodLabel(project.period),
    defaultImage: `/projects/${project.id}.webp`,
    selectedImage: `/projects/${project.id}.webp`,
    alt: `${project.title} landing page screenshot`,
    caseStudyHref: `/projects/${project.id}`,
    sourceHref: project.link,
  }
})
