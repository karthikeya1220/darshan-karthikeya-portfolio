"use client"

import Image from "next/image"
import { addQueryParams } from "@/utils/url"
import {
  ArrowRightIcon,
  BoxIcon,
  ExternalLinkIcon,
  InfinityIcon,
} from "lucide-react"

import { UTM_PARAMS } from "@/config/site"
import { cn } from "@/lib/utils"
import {
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { IconTile } from "@/components/ui/icon-tile"
import {
  Collapsible,
  CollapsibleChevronDownIcon,
} from "@/components/collapsible-animated"

import type { Project } from "../../types/projects"
import { useTechFilter } from "../tech-filter-context"

/**
 * One project rendered as an engineering drawing sheet: crop-mark corners,
 * ghost sheet index, stamped metrics, and a title-block footer.
 */
export function ProjectSheet({
  className,
  index,
  project,
}: {
  className?: string
  /** Zero-based position in the roster; drives the sheet index. */
  index: number
  project: Project
}) {
  const { start, end } = project.period
  const isOngoing = !end
  const isSinglePeriod = end === start
  const { activeFilter, setActiveFilter } = useTechFilter()
  const matchesFilter =
    activeFilter === null || project.skills.includes(activeFilter)
  const sheetNo = String(index + 1).padStart(2, "0")

  return (
    <Collapsible
      id={`project-${project.id}`}
      className={cn(
        "group/card relative flex scroll-mt-14 flex-col border border-line transition duration-200 hover:border-foreground/30",
        !matchesFilter && "opacity-40",
        className
      )}
      defaultOpen={project.isExpanded}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 size-2 border-t border-l border-foreground/40 transition-colors group-hover/card:border-foreground/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 size-2 border-t border-r border-foreground/40 transition-colors group-hover/card:border-foreground/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 size-2 border-b border-l border-foreground/40 transition-colors group-hover/card:border-foreground/70"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 bottom-0 size-2 border-r border-b border-foreground/40 transition-colors group-hover/card:border-foreground/70"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute top-14 right-3 font-mono text-4xl leading-none text-foreground/6 tabular-nums select-none"
      >
        {sheetNo}
      </span>

      <CollapsibleTrigger className="w-full cursor-pointer text-left hover:bg-accent-muted">
        <div className="flex items-center gap-3 p-4 pb-3">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="size-6 shrink-0 grayscale select-none group-hover/card:grayscale-0"
              unoptimized
              aria-hidden
            />
          ) : (
            <IconTile className="shrink-0">
              {project.icon ?? <BoxIcon />}
            </IconTile>
          )}

          <h3 className="flex-1 leading-snug font-medium text-balance">
            {project.title}
          </h3>

          <CollapsibleChevronDownIcon
            className="size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </div>

        {Array.isArray(project.metrics) && project.metrics.length > 0 && (
          <dl className="flex flex-wrap gap-1.5 px-4 pb-4">
            {project.metrics.map((metric, metricIndex) => (
              <div
                key={metricIndex}
                className="inline-flex items-baseline gap-1.5 border border-line px-2 py-1"
              >
                <dt className="sr-only">{metric.label}</dt>
                <dd className="flex items-baseline gap-1.5">
                  <span className="font-mono font-semibold whitespace-nowrap tabular-nums">
                    {metric.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {metric.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className="overflow-hidden">
        <div className="space-y-4 border-t border-line p-4">
          {project.description && (
            <div className="typeset typeset-description">
              <p>{project.description}</p>
            </div>
          )}

          {project.skills.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {project.skills.map((skill, skillIndex) => {
                const isActive = activeFilter === skill

                return (
                  <li key={skillIndex} className="flex">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveFilter(isActive ? null : skill)}
                      className={cn(
                        "inline-flex items-center rounded-full border px-1.5 py-0.5 font-mono text-xs transition-colors",
                        isActive
                          ? "border-foreground bg-foreground text-background"
                          : "bg-zinc-50 text-muted-foreground hover:text-foreground dark:bg-zinc-900"
                      )}
                    >
                      {skill}
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </CollapsibleContent>

      <div className="screen-line-top mt-auto flex items-center justify-between gap-3 px-4 py-2.5 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        <span className="flex items-center gap-1 whitespace-nowrap tabular-nums">
          <span>{start}</span>
          {!isSinglePeriod && (
            <>
              <span aria-hidden>—</span>
              {isOngoing ? (
                <InfinityIcon
                  className="size-3"
                  aria-label="Present"
                  strokeWidth={2}
                />
              ) : (
                <span>{end}</span>
              )}
            </>
          )}
        </span>

        <span className="flex shrink-0 items-center gap-3">
          <a
            className="flex items-center gap-1 transition-colors hover:text-foreground"
            href={`/projects/${project.id}`}
          >
            Case study
            <ArrowRightIcon className="size-3" aria-hidden />
          </a>
          <a
            className="flex items-center gap-1 transition-colors hover:text-foreground"
            href={addQueryParams(project.link, UTM_PARAMS)}
            target="_blank"
            rel="noopener"
          >
            Source
            <ExternalLinkIcon className="size-3" aria-hidden />
          </a>
        </span>
      </div>
    </Collapsible>
  )
}
