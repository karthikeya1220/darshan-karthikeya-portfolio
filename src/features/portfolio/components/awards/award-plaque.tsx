import { format } from "date-fns"
import { Medal, Paperclip } from "lucide-react"

import { IconTile } from "@/components/ui/icon-tile"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Award } from "@/features/portfolio/types/awards"

/**
 * One award rendered as a citation plaque: double-rule frame, engraved rank
 * numeral, and the award description set as the citation.
 */
export function AwardPlaque({ award }: { award: Award }) {
  const rankMatch = award.prize.match(/\d+/)
  const rank = rankMatch ? rankMatch[0].padStart(2, "0") : null

  return (
    <article className="relative flex flex-col border border-line after:pointer-events-none after:absolute after:inset-[3px] after:border after:border-line/60">
      {rank && (
        <span
          aria-hidden
          className="absolute top-3 right-4 font-mono text-3xl leading-none text-foreground/15 tabular-nums select-none"
        >
          {rank}
        </span>
      )}

      <div className="flex items-center gap-3 p-4 pb-3">
        <IconTile className="shrink-0">{award.icon ?? <Medal />}</IconTile>

        <h3 className="flex-1 leading-snug font-medium text-balance">
          {award.title}
        </h3>
      </div>

      <dl className="flex flex-wrap items-center gap-x-2 px-4 font-mono text-xs text-muted-foreground">
        <div>
          <dt className="sr-only">Prize</dt>
          <dd>{award.prize}</dd>
        </div>

        <Separator
          className="data-vertical:h-3.5 data-vertical:self-center"
          orientation="vertical"
          aria-hidden
        />

        <div>
          <dt className="sr-only">Awarded in</dt>
          <dd>
            <time dateTime={new Date(award.date).toISOString()}>
              {format(new Date(award.date), "MM.yyyy")}
            </time>
          </dd>
        </div>

        <Separator
          className="data-vertical:h-3.5 data-vertical:self-center"
          orientation="vertical"
          aria-hidden
        />

        <div>
          <dt className="sr-only">Received in Grade</dt>
          <dd>{award.grade}</dd>
        </div>
      </dl>

      {award.description && (
        <p className="px-4 pt-2 pb-4 text-sm text-pretty text-muted-foreground">
          {award.description}
        </p>
      )}

      {award.referenceLink && (
        <div className="screen-line-top mt-auto flex justify-end px-4 py-2.5">
          <Tooltip>
            <TooltipTrigger
              render={
                <a
                  className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors after:absolute after:-inset-2 hover:text-foreground"
                  href={award.referenceLink}
                  target="_blank"
                  rel="noopener"
                  aria-label="Open reference attachment"
                >
                  Reference
                  <Paperclip className="size-3.5" aria-hidden />
                </a>
              }
            />
            <TooltipContent>
              <p>Open reference attachment</p>
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </article>
  )
}
