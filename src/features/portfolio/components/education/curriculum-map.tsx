import type { Education } from "../../types/education"

/**
 * Hairline diagram of focus areas and their skills — Fig. 6.
 * Server-rendered; reads like a drawing's key schedule.
 */
export function CurriculumMap({
  coursework,
}: {
  coursework?: Education["coursework"]
}) {
  if (!coursework || coursework.length === 0) {
    return null
  }

  return (
    <figure className="px-4 pt-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {coursework.map((group, index) => (
          <div key={group.label} className="border border-line">
            <div className="flex items-baseline justify-between border-b border-line px-3 py-2">
              <span className="text-sm font-medium text-balance">
                {group.label}
              </span>
              <span
                className="font-mono text-[10px] text-muted-foreground/80 select-none"
                aria-hidden
              >
                {(index + 1).toString().padStart(2, "0")}
              </span>
            </div>

            <ul className="px-3 py-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="flex items-baseline gap-2 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  <span className="whitespace-nowrap">{skill}</span>
                  <span
                    className="min-w-4 flex-1 border-b border-dotted border-line"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <figcaption className="screen-line-top mt-3 py-3 text-center text-sm text-balance">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 6.
        </span>
        Curriculum map of {coursework.length} focus areas and the core skills
        that sit under each.
      </figcaption>
    </figure>
  )
}
