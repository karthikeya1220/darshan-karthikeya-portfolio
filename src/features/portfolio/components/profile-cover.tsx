"use client"

import { cn } from "@/lib/utils"

export function ProfileCover() {
  return (
    <div
      className={cn(
        "relative flex aspect-2.5/1 items-center justify-center border-x border-line select-none sm:aspect-3.5/1",
        "screen-line-top screen-line-bottom before:-top-px after:-bottom-px",
        "bg-black/0.75 dark:bg-white/1"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
        <div className="text-4xl font-bold">DK</div>
      </div>
    </div>
  )
}
