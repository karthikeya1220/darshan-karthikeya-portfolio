import { cn } from "@/lib/utils"
import {
  TimescaleAge,
  TimescaleContent,
  TimescaleHeader,
  TimescaleItem,
  TimescaleRail,
  TimescaleRoot,
  TimescaleTick,
  TimescaleTrack,
  TimescaleViewport,
  TimescaleYear,
} from "@/registry/components/timescale"
import {
  TIMELINE_BIRTH_YEAR,
  TIMELINE_MILESTONES,
} from "@/features/portfolio/data/timeline"

export function Timeline({
  className,
  ...props
}: React.ComponentProps<typeof TimescaleRoot>) {
  return (
    <TimescaleRoot className={cn("w-full", className)} {...props}>
      <TimescaleHeader>
        <TimescaleAge>Age</TimescaleAge>
        <TimescaleYear>Years</TimescaleYear>
      </TimescaleHeader>

      <TimescaleViewport>
        <TimescaleTrack>
          <TimescaleRail />

          {TIMELINE_MILESTONES.map((milestone) => (
            <TimescaleItem key={milestone.year}>
              <TimescaleTick />
              <TimescaleAge>
                {milestone.year - TIMELINE_BIRTH_YEAR}
              </TimescaleAge>
              <TimescaleYear>{milestone.year}</TimescaleYear>
              {milestone.content && (
                <TimescaleContent className="typeset typeset-timescale">
                  <p>{milestone.content}</p>
                </TimescaleContent>
              )}
            </TimescaleItem>
          ))}
        </TimescaleTrack>
      </TimescaleViewport>
    </TimescaleRoot>
  )
}
