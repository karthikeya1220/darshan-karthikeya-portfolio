import { parsePeriodDate } from "@/utils/date"
import { eachMonthOfInterval, endOfMonth, format, startOfMonth } from "date-fns"

import { cn } from "@/lib/utils"

import type { Project } from "../../types/projects"

type BuildLogRow = {
  id: string
  title: string
  /** Epoch ms */
  start: number
  end: number
}

/**
 * Ruler-style build log: one bar per project on a shared month axis.
 * Server-rendered — hover is CSS, navigation is a plain anchor.
 */
export function BuildLog({ projects }: { projects: Project[] }) {
  const today = new Date()

  const rows: BuildLogRow[] = projects.map((project) => ({
    id: project.id,
    title: project.title,
    start: parsePeriodDate(project.period.start, "first").getTime(),
    end: project.period.end
      ? parsePeriodDate(project.period.end, "last").getTime()
      : today.getTime(),
  }))

  if (rows.length === 0) {
    return null
  }

  const domainStart = startOfMonth(
    new Date(Math.min(...rows.map((row) => row.start)))
  )
  const domainEnd = endOfMonth(
    new Date(Math.max(today.getTime(), ...rows.map((row) => row.end)))
  )
  const span = domainEnd.getTime() - domainStart.getTime()

  const pct = (time: number) => ((time - domainStart.getTime()) / span) * 100

  const monthTicks = eachMonthOfInterval({
    start: domainStart,
    end: domainEnd,
  })
  const yearTicks = monthTicks.filter((date) => date.getMonth() === 0)
  const todayPct = Math.min(100, Math.max(0, pct(today.getTime())))

  return (
    <figure className="px-4 pt-4">
      <div className="grid grid-cols-[6.5rem_1fr] items-end gap-x-3 pb-1">
        <div aria-hidden />
        <div className="relative h-5" aria-hidden>
          {monthTicks.map((date) => (
            <span
              key={`tick-${date.getTime()}`}
              className="absolute bottom-0 block h-1.5 w-px bg-line"
              style={{ left: `${pct(date.getTime())}%` }}
            />
          ))}

          {yearTicks.map((date) => (
            <span
              key={`year-${date.getTime()}`}
              className="absolute bottom-0 block h-3 w-px bg-line"
              style={{ left: `${pct(date.getTime())}%` }}
            >
              <span className="absolute bottom-3.5 left-0 -translate-x-1/2 font-mono text-[10px] text-muted-foreground">
                {format(date, "yyyy")}
              </span>
            </span>
          ))}

          <span
            className="absolute bottom-0 block h-full border-l border-dashed border-muted-foreground/70"
            style={{ left: `${todayPct}%` }}
          >
            <span className="absolute right-0 bottom-3.5 pr-1 font-mono text-[10px] whitespace-nowrap text-muted-foreground">
              today
            </span>
          </span>
        </div>
      </div>

      <div>
        {rows.map((row) => {
          const left = pct(row.start)
          const width = Math.max(pct(row.end) - left, 0.6)

          return (
            <a
              key={row.id}
              href={`#project-${row.id}`}
              aria-label={`Jump to ${row.title}`}
              className="group grid grid-cols-[6.5rem_1fr] items-center gap-x-3 outline-none focus-visible:inset-ring-2 focus-visible:inset-ring-ring/50"
            >
              <span className="truncate text-right text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                {row.title}
              </span>

              <span
                className="relative block h-5 border-b border-dashed border-line"
                aria-hidden
              >
                {monthTicks.map((date) => (
                  <span
                    key={`grid-${date.getTime()}`}
                    className={cn(
                      "absolute inset-y-0 block w-px bg-line/60",
                      date.getMonth() !== 0 && "hidden sm:block"
                    )}
                    style={{ left: `${pct(date.getTime())}%` }}
                  />
                ))}

                <span
                  className="absolute inset-y-0.5 border border-foreground/30 bg-foreground/10 transition-colors group-hover:bg-foreground/20"
                  style={{ left: `${left}%`, width: `${width}%` }}
                />

                <span
                  className="absolute inset-y-0 block border-l border-dashed border-muted-foreground/70"
                  style={{ left: `${todayPct}%` }}
                />
              </span>
            </a>
          )
        })}
      </div>

      <figcaption className="screen-line-top mt-3 py-3 text-center text-sm text-balance tabular-nums">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 7.
        </span>
        Build log of {rows.length} projects, {format(domainStart, "MM.yyyy")} –{" "}
        {format(domainEnd, "MM.yyyy")}. Ongoing work runs to the dashed today
        line. Click a bar to jump to the project.
      </figcaption>
    </figure>
  )
}
