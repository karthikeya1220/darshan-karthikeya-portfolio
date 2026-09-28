import { parsePeriodDate } from "@/utils/date"
import { getYear } from "date-fns"

import { cn } from "@/lib/utils"

import type { Education } from "../../types/education"

/**
 * Aggregate stat strip shown above the Education list.
 */
export function EducationLedger({ education }: { education: Education[] }) {
  if (education.length === 0) {
    return null
  }

  const startYears = education.map((item) =>
    getYear(parsePeriodDate(item.period.start, "first"))
  )
  const endYears = education.map((item) =>
    item.period.end
      ? getYear(parsePeriodDate(item.period.end, "last"))
      : new Date().getFullYear()
  )
  const minYear = Math.min(...startYears)
  const maxYear = Math.max(...endYears)
  const academicYears = maxYear === minYear ? 1 : maxYear - minYear
  const semesters = academicYears * 2
  const skillCount = education.reduce(
    (total, item) => total + (item.skills?.length ?? 0),
    0
  )

  const cells = [
    {
      value: minYear === maxYear ? `${minYear}` : `${minYear} – ${maxYear}`,
      label: "on campus",
    },
    { value: `${semesters}`, label: "semesters" },
    ...(skillCount > 0
      ? [{ value: `${skillCount}`, label: "core skills" }]
      : []),
    { value: `${maxYear}`, label: "graduating" },
  ]

  return (
    <dl className="screen-line-bottom grid grid-cols-2 gap-y-1 px-4 py-3 sm:grid-cols-4">
      {cells.map((cell, index) => (
        <div
          key={`${cell.value}-${cell.label}`}
          className={cn(
            "flex items-baseline gap-1.5 pr-4",
            index === 0
              ? ""
              : index % 2 === 0
                ? "sm:border-l sm:border-dashed sm:border-line sm:pl-4"
                : "border-l border-dashed border-line pl-4"
          )}
        >
          <dt className="sr-only">{cell.label}</dt>
          <dd className="flex items-baseline gap-1.5">
            <span className="font-mono font-semibold whitespace-nowrap tabular-nums">
              {cell.value}
            </span>
            <span className="text-xs text-muted-foreground">{cell.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
