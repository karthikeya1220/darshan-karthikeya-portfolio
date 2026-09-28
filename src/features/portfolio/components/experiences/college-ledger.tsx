import { getPeriodYearSpan } from "@/utils/date"

import { cn } from "@/lib/utils"

import type { Experience } from "../../types/experiences"

/**
 * Aggregate stat strip shown above the College Club Experience list.
 */
export function CollegeLedger({ experiences }: { experiences: Experience[] }) {
  const positions = experiences.flatMap((experience) => experience.positions)

  const span = getPeriodYearSpan(
    positions.map((position) => position.employmentPeriod)
  )
  const metrics = positions.flatMap((position) => position.metrics ?? [])

  const cells = [
    ...(span ? [{ value: span, label: "on campus" }] : []),
    { value: `${positions.length}`, label: "leadership roles" },
    ...metrics.map((metric) => ({
      value: metric.value,
      label: metric.label,
    })),
  ]

  if (cells.length === 0) {
    return null
  }

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
