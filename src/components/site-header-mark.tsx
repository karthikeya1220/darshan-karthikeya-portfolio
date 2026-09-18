"use client"

import Link from "next/link"

export function SiteHeaderMark() {
  return (
    <Link href="/" aria-label="Home" className="font-medium text-sm shrink-0">
      DK
    </Link>
  )
}
