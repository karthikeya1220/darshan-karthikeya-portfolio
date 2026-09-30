import Link from "next/link"

import { cn } from "@/lib/utils"

/**
 * DK monogram mark — the same rounded-tile glyph used by the favicon.
 * The tile inherits `currentColor`; the glyph is punched out in the page
 * background color, so light/dark themes adapt automatically.
 */
export function SiteHeaderMark({
  className,
  svgClassName,
}: {
  className?: string
  svgClassName?: string
}) {
  return (
    <Link href="/" aria-label="Home" className={cn("shrink-0", className)}>
      <svg
        viewBox="0 0 64 64"
        aria-hidden
        className={cn("size-6", svgClassName)}
      >
        <rect width="64" height="64" rx="14" fill="currentColor" />
        <g style={{ fill: "var(--background)" }}>
          <rect x="12" y="14" width="24" height="8" />
          <rect x="12" y="42" width="24" height="8" />
          <rect x="12" y="14" width="8" height="36" />
          <rect x="28" y="14" width="8" height="36" />
          <rect x="36" y="24" width="8" height="8" />
          <rect x="44" y="16" width="8" height="8" />
          <rect x="36" y="32" width="8" height="8" />
          <rect x="44" y="40" width="8" height="8" />
        </g>
      </svg>
    </Link>
  )
}
