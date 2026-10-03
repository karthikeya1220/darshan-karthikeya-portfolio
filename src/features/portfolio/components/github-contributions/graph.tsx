"use client"

import { use } from "react"
import { formatNumber } from "@/utils/format"
import { format, parseISO } from "date-fns"
import { LoaderIcon } from "lucide-react"

import ContributionSkyline from "@/components/ui/contribution-skyline"
import type { Activity } from "@/registry/components/contribution-graph"
import { SOCIAL } from "@/features/portfolio/data/social-links"

export function GitHubContributionGraph({
  contributions,
}: {
  contributions: Promise<Activity[]>
}) {
  const data = use(contributions)

  if (data.length === 0) {
    return null
  }

  const totalCount = data.reduce((sum, activity) => sum + activity.count, 0)

  return (
    <figure className="p-4">
      <ContributionSkyline data={data} palette="mono" />
      <figcaption className="mt-3 text-sm text-pretty tabular-nums">
        <span className="mr-2 tracking-wide text-muted-foreground/80">
          Fig. 2.
        </span>
        {formatNumber(totalCount)} contributions,{" "}
        {format(parseISO(data[0].date), "dd.MM.yyyy")} –{" "}
        {format(parseISO(data[data.length - 1].date), "dd.MM.yyyy")}. Source:{" "}
        <a
          href={SOCIAL.github.href}
          className="link-underline"
          target="_blank"
          rel="noopener"
        >
          GitHub
        </a>
        .
      </figcaption>
    </figure>
  )
}

export function GitHubContributionFallback() {
  return (
    <div className="flex h-90 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
