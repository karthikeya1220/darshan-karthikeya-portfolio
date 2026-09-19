"use client"

import { useState } from "react"
import { useMotionValueEvent, useScroll } from "motion/react"

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(Math.round(latest * 100))
  })

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px">
      <div
        className="h-full bg-foreground/40 transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />
    </div>
  )
}
