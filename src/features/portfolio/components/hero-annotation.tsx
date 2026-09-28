"use client"

import { cubicBezier, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

const DRAW_EASE = cubicBezier(0.22, 1, 0.36, 1)

function useDraw() {
  const reduce = useReducedMotion()

  return {
    drawX: (delay: number, duration = 0.5) => ({
      initial: reduce ? false : { scaleX: 0 },
      animate: { scaleX: 1 },
      transition: { duration, delay, ease: DRAW_EASE },
    }),
    drawY: (delay: number, duration = 0.2) => ({
      initial: reduce ? false : { scaleY: 0 },
      animate: { scaleY: 1 },
      transition: { duration, delay, ease: DRAW_EASE },
    }),
    fade: (delay: number) => ({
      initial: reduce ? false : { opacity: 0, y: 2 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay, ease: DRAW_EASE },
    }),
    mark: (delay: number) => ({
      initial: reduce ? false : { opacity: 0, scale: 0.5 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.25, delay, ease: DRAW_EASE },
    }),
  }
}

/**
 * Dimension line spanning the name cell, end ticks on the cell edges.
 * Replaces the plain hairline above the masthead; draws itself on load.
 */
export function HeroDimensionLine({
  label = "SCALE 1 : 1",
}: {
  label?: string
}) {
  const { drawX, drawY, fade } = useDraw()

  return (
    <div className="flex h-5 items-center gap-2 select-none" aria-hidden>
      <motion.span className="h-2 w-px shrink-0 bg-line" {...drawY(0.1)} />
      <motion.span
        className="h-px flex-1 origin-left bg-line"
        {...drawX(0.18, 0.45)}
      />
      <motion.span
        className="shrink-0 font-mono text-[10px]/none text-muted-foreground"
        {...fade(0.55)}
      >
        {label}
      </motion.span>
      <motion.span
        className="h-px flex-1 origin-left bg-line"
        {...drawX(0.65, 0.4)}
      />
      <motion.span className="h-2 w-px shrink-0 bg-line" {...drawY(0.95)} />
    </div>
  )
}

const CORNERS = [
  { className: "top-0 left-0 origin-top-left border-t border-l", delay: 0.05 },
  {
    className: "top-0 right-0 origin-top-right border-t border-r",
    delay: 0.12,
  },
  {
    className: "right-0 bottom-0 origin-bottom-right border-r border-b",
    delay: 0.19,
  },
  {
    className: "bottom-0 left-0 origin-bottom-left border-b border-l",
    delay: 0.26,
  },
]

/** Registration marks at the sheet corners. */
export function HeroCorners({ className }: { className?: string }) {
  const { mark } = useDraw()

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      {CORNERS.map((corner) => (
        <motion.span
          key={corner.className}
          className={cn(
            "absolute size-3 border-foreground/25",
            corner.className
          )}
          {...mark(corner.delay)}
        />
      ))}
    </div>
  )
}

/** Leader line from the verified badge to a mono micro-label. */
export function VerifiedLeader({ className }: { className?: string }) {
  const { drawX, fade } = useDraw()

  return (
    <span
      className={cn("hidden items-center gap-1.5 lg:inline-flex", className)}
      aria-hidden
    >
      <motion.span
        className="h-px w-6 origin-left bg-line"
        {...drawX(0.9, 0.3)}
      />
      <motion.span
        className="font-mono text-[10px]/none text-muted-foreground"
        {...fade(1.1)}
      >
        VERIFIED
      </motion.span>
    </span>
  )
}
