import { parsePeriodDate } from "@/utils/date"
import { getYear } from "date-fns"

import type { Experience } from "../../types/experiences"

const PLOT_HEIGHT = 72

/**
 * Column chart of how many roles were held simultaneously per year.
 * Server-rendered; plot is decorative, the caption carries the meaning.
 */
export function LeadershipLoadChart({
  experiences,
}: {
  experiences: Experience[]
}) {
  const spans = experiences.flatMap((experience) =>
    experience.positions.map((position) => {
      const { start, end } = position.employmentPeriod
      return {
        startYear: getYear(parsePeriodDate(start, "first")),
        endYear: getYear(end ? parsePeriodDate(end, "last") : new Date()),
      }
    })
  )

  if (spans.length === 0) {
    return null
  }

  const firstYear = Math.min(...spans.map((span) => span.startYear))
  const lastYear = Math.max(...spans.map((span) => span.endYear))

  if (!Number.isFinite(firstYear) || !Number.isFinite(lastYear)) {
    return null
  }

  const years: number[] = []
  for (let year = firstYear; year <= lastYear; year++) {
    years.push(year)
  }

  const counts = years.map(
    (year) =>
      spans.filter((span) => span.startYear <= year && year <= span.endYear)
        .length
  )
  const maxCount = Math.max(...counts, 1)
  const minCount = Math.min(...counts)

  const column = "flex w-20 flex-col items-center"

  return (
    <figure className="px-4 pt-4">
      <div className="flex justify-center gap-6" aria-hidden>
        {years.map((year, index) => (
          <div key={year} className={column}>
            <span className="mb-1.5 font-mono text-xs font-semibold tabular-nums">
              {counts[index]}
            </span>
            <div
              className="flex w-full items-end"
              style={{ height: `${PLOT_HEIGHT}px` }}
            >
              {counts[index] > 0 && (
                <span
                  className="block w-full border border-foreground/30 bg-foreground/10"
                  style={{
                    height: `${Math.max(
                      Math.round((counts[index] / maxCount) * PLOT_HEIGHT),
                      8
                    )}px`,
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="border-b border-line" aria-hidden />

      <div className="flex justify-center gap-6 pt-1.5" aria-hidden>
        {years.map((year) => (
          <span
            key={year}
            className={`${column} font-mono text-xs text-muted-foreground`}
          >
            {year}
          </span>
        ))}
      </div>

      <figcaption className="screen-line-top mt-3 py-3 text-center text-sm text-balance tabular-nums">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 5.
        </span>
        Leadership load: {minCount}–{maxCount} concurrent roles per year,{" "}
        {firstYear}–{lastYear}.
      </figcaption>
    </figure>
  )
}
