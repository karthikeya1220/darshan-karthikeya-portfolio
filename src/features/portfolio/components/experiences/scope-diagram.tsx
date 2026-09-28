import { getPeriodYearSpan } from "@/utils/date"

import type { Experience } from "../../types/experiences"

const TECH_AFFAIRS_ID = "technical-affairs-iiitdm"
const WEB_TEAM_ID = "iiitdm-web-team"
const PLACEMENT_CELL_ID = "placement-cell-iiitdm"

/**
 * Hairline scope tree: which departments the concurrent college roles live in.
 * Structural relationships are fixed; labels come from the experience data.
 */
export function ScopeDiagram({ experiences }: { experiences: Experience[] }) {
  const byId = new Map(
    experiences.map((experience) => [experience.id, experience])
  )

  const techAffairs = byId.get(TECH_AFFAIRS_ID)
  const webTeam = byId.get(WEB_TEAM_ID)
  const placementCell = byId.get(PLACEMENT_CELL_ID)

  if (!techAffairs || !webTeam || !placementCell) {
    return null
  }

  const span = getPeriodYearSpan(
    experiences.flatMap((experience) =>
      experience.positions.map((position) => position.employmentPeriod)
    )
  )

  return (
    <figure className="px-4 pt-4">
      <div aria-hidden>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-sm font-medium">IIITDM Kancheepuram</span>
          {placementCell.location && (
            <span className="text-xs text-muted-foreground">
              {placementCell.location} ({placementCell.locationType})
            </span>
          )}
        </div>

        <ul className="mt-2 ml-1 space-y-2 border-l border-line pl-4">
          <li className="relative">
            <span
              className="absolute top-2.5 -left-4 w-3 border-t border-line"
              aria-hidden
            />
            <Node experience={techAffairs} />
          </li>

          <li className="relative">
            <span
              className="absolute top-2.5 -left-4 w-3 border-t border-line"
              aria-hidden
            />
            <Node experience={webTeam} />
          </li>

          <li className="relative">
            <span
              className="absolute top-2.5 -left-4 w-3 border-t border-line"
              aria-hidden
            />
            <Node experience={placementCell} />
          </li>
        </ul>
      </div>

      <figcaption className="screen-line-top mt-3 py-3 text-center text-sm text-balance tabular-nums">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 4.
        </span>
        Scope of concurrent leadership roles at IIITDM Kancheepuram
        {span ? `, ${span}.` : "."}
      </figcaption>
    </figure>
  )
}

function Node({ experience }: { experience: Experience }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className="text-sm font-medium">{experience.companyName}</span>
      {experience.positions[0]?.title && (
        <span className="font-mono text-xs text-muted-foreground">
          {experience.positions[0].title}
        </span>
      )}
    </div>
  )
}
