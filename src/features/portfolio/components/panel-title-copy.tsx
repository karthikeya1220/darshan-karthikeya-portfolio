"use client"

import { LinkIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function PanelTitleCopy({
  id,
  className,
  ...props
}: {
  id: string
  className?: string
}) {
  const handleCopy = () => {
    const url = `${window.location.origin}#${id}`
    navigator.clipboard.writeText(url)
  }

  return (
    <button
      className={cn(
        "absolute top-1 ml-1 size-7 shrink-0 border-none text-muted-foreground opacity-0 transition-opacity group-hover/panel-title:opacity-100",
        className
      )}
      onClick={handleCopy}
      aria-label="Copy link to section"
      {...props}
    >
      <LinkIcon />
    </button>
  )
}
