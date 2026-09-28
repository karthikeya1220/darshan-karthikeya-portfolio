import { Fragment } from "react"

import type { Project } from "../../types/projects"

/**
 * Tech-tag tally across projects — Fig. 8. Reads like a bill of materials.
 * Server-rendered; bar length is the number of projects using each tag.
 */
export function MaterialsSchedule({ projects }: { projects: Project[] }) {
  const tally = new Map<string, number>()
  for (const project of projects) {
    for (const skill of project.skills) {
      tally.set(skill, (tally.get(skill) ?? 0) + 1)
    }
  }

  const rows = [...tally.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)

  if (rows.length === 0) {
    return null
  }

  const maxCount = rows[0][1]

  return (
    <figure className="px-4 pt-4">
      <div className="grid grid-cols-[7rem_1fr_2.5rem] items-center gap-x-3 gap-y-1">
        {rows.map(([tech, count]) => (
          <Fragment key={tech}>
            <span className="truncate text-right font-mono text-xs text-muted-foreground">
              {tech}
            </span>

            <span className="relative block h-4 border-b border-dashed border-line">
              <span
                className="absolute inset-y-0.5 left-0 border border-foreground/30 bg-foreground/10"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </span>

            <span className="font-mono text-xs whitespace-nowrap text-muted-foreground tabular-nums">
              ×{count}
            </span>
          </Fragment>
        ))}
      </div>

      <figcaption className="screen-line-top mt-3 py-3 text-center text-sm text-balance tabular-nums">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 8.
        </span>
        Materials schedule of the {rows.length} most-used tags across{" "}
        {projects.length} projects — bar length shows how many projects use
        each.
      </figcaption>
    </figure>
  )
}
