import { parsePeriodDate } from "@/utils/date"
import { differenceInMonths } from "date-fns"
import { BriefcaseBusinessIcon, InfinityIcon } from "lucide-react"
import ReactMarkdown from "react-markdown"

import { cn } from "@/lib/utils"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/ui/separator"
import { Tag } from "@/components/ui/tag"
import { Collapsible } from "@/components/collapsible-animated"
import {
  HandwrittenArrow,
  HandwrittenNote,
} from "@/features/portfolio/components/handwritten-note"
import type { ExperiencePosition } from "@/features/portfolio/types/experiences"

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePosition
}) {
  const { start, end } = position.employmentPeriod
  const isOngoing = !end
  const duration = formatDuration(start, end)

  return (
    <Collapsible
      className="group/experience-position relative"
      defaultOpen={position.isExpanded}
      disabled={!position.description}
    >
      <div className="pointer-events-none absolute bottom-0 left-3 hidden size-4 bg-background group-last/experience-position:flex">
        <span className="size-full -translate-y-2.25 rounded-bl-sm border-b border-l" />
      </div>

      {position.annotation && (
        <HandwrittenNote className="top-1 left-full ml-4 hidden w-24 flex-col items-start lg:flex">
          <span className="-rotate-3">{position.annotation}</span>
          <HandwrittenArrow className="-mt-0.5 -ml-1 size-6" />
        </HandwrittenNote>
      )}

      <CollapsibleTrigger
        className={cn(
          "group block w-full text-left",
          "relative before:absolute before:-top-1 before:-right-1 before:-bottom-1.5 before:left-7 before:-z-1 before:rounded-lg before:transition-[background-color] before:ease-out hover:before:bg-accent-muted",
          "outline-none focus-visible:before:inset-ring-2 focus-visible:before:inset-ring-ring/50",
          "data-disabled:before:content-none"
        )}
      >
        <div className="relative z-1 mb-1 flex items-start gap-3 text-base">
          <IconTile>{position.icon ?? <BriefcaseBusinessIcon />}</IconTile>

          <h4 className="flex-1 font-medium text-balance">{position.title}</h4>
        </div>

        <dl className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <div>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </div>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
            </>
          )}

          <div>
            <dt className="sr-only">Employment Period</dt>
            <dd className="flex items-center gap-0.5 tabular-nums">
              <span>{start}</span>
              <span className="font-mono">—</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-4.5 translate-y-[0.5px]"
                  aria-label="Present"
                  strokeWidth={1.5}
                />
              ) : (
                <span>{end}</span>
              )}
            </dd>
          </div>

          {duration && (
            <>
              <Separator
                className="data-vertical:h-4 data-vertical:self-center"
                orientation="vertical"
                aria-hidden
              />
              <div>
                <dt className="sr-only">Duration</dt>
                <dd className="tabular-nums">{duration}</dd>
              </div>
            </>
          )}
        </dl>

        {Array.isArray(position.metrics) && position.metrics.length > 0 && (
          <dl className="mt-2 grid grid-cols-2 gap-y-1 pl-9 sm:grid-cols-3">
            {position.metrics.map((metric, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-baseline gap-1.5 pr-4",
                  index === 0
                    ? ""
                    : index % 2 === 0
                      ? "sm:border-l sm:border-dashed sm:border-line sm:pl-4"
                      : "border-l border-dashed border-line pl-4"
                )}
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd className="flex items-baseline gap-1.5">
                  <span className="font-mono font-semibold whitespace-nowrap tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 pt-3 pl-9">
          {position.description && (
            <div className="typeset typeset-description [&_li]:ps-0.5 [&_ul]:ps-3.5">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </div>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {position.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Tag>{skill}</Tag>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

function formatDuration(start: string, end?: string): string {
  const startHasMonth = start.includes(".")
  const endHasMonth = end ? end.includes(".") : true

  if (!startHasMonth && end && !endHasMonth) {
    const years = parseInt(end, 10) - parseInt(start, 10)
    if (years <= 0) {
      return ""
    }
    return `${years}y`
  }

  const startDate = parsePeriodDate(start, "first")
  const endDate = end ? parsePeriodDate(end, "last") : new Date()

  const totalMonths = differenceInMonths(endDate, startDate) + 1
  if (totalMonths <= 0) {
    return ""
  }

  if (totalMonths < 12) {
    return `${totalMonths}m`
  }

  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  if (months === 0) {
    return `${years}y`
  }
  return `${years}y ${months}m`
}
