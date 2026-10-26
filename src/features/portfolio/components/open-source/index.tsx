import { ArrowUpRightIcon, GitPullRequestIcon } from "lucide-react"

import { Tag } from "@/components/ui/tag"
import {
  Panel,
  PanelContent,
  PanelDescription,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import {
  CONTRIBUTION_PRINCIPLES,
  OPEN_SOURCE_CONTRIBUTIONS,
} from "@/features/portfolio/data/open-source"

const ID = "open-source"

export function OpenSource() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Open Source</a>
          <PanelTitleSup>({OPEN_SOURCE_CONTRIBUTIONS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
        <PanelDescription>
          Engineering beyond my own repositories. I contribute to real-world
          open-source projects by solving engineering problems that affect
          software correctness, reliability, and performance.
        </PanelDescription>
      </PanelHeader>

      {/* Contributions */}
      <div className="divide-y border-t">
        {OPEN_SOURCE_CONTRIBUTIONS.map((contrib) => (
          <ContributionCard key={contrib.id} contribution={contrib} />
        ))}
      </div>

      {/* How I Contribute */}
      <PanelContent className="border-t">
        <p className="mb-4 text-xs font-medium tracking-widest text-muted-foreground uppercase">
          How I Contribute
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRIBUTION_PRINCIPLES.map((principle) => (
            <PrincipleCard key={principle.id} principle={principle} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  )
}

function ContributionCard({
  contribution,
}: {
  contribution: (typeof OPEN_SOURCE_CONTRIBUTIONS)[number]
}) {
  return (
    <div className="group/contrib space-y-4 p-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-6 shrink-0 items-center justify-center rounded-md border bg-muted text-muted-foreground">
            <GitPullRequestIcon className="size-3.5" />
          </span>
          <h3 className="text-base font-semibold">{contribution.project}</h3>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {contribution.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      {/* Summary */}
      <p className="text-sm text-muted-foreground">{contribution.summary}</p>

      {/* Highlights */}
      <ul className="space-y-2">
        {contribution.highlights.map((highlight, i) => (
          <li key={i} className="flex gap-2.5 text-sm">
            <span
              className="mt-[5px] size-1.5 shrink-0 rounded-full bg-foreground/30"
              aria-hidden
            />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>

      {/* Links */}
      <div className="flex flex-wrap gap-2 pt-1">
        {contribution.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 transition-colors hover:underline"
          >
            {link.label}
            <ArrowUpRightIcon className="size-3.5 shrink-0 text-muted-foreground" />
          </a>
        ))}
      </div>
    </div>
  )
}

function PrincipleCard({
  principle,
}: {
  principle: (typeof CONTRIBUTION_PRINCIPLES)[number]
}) {
  return (
    <div className="rounded-md border bg-muted/30 p-3.5 transition-colors hover:bg-muted/60">
      <p className="mb-1 text-sm font-medium">{principle.label}</p>
      <p className="text-xs leading-relaxed text-muted-foreground">
        {principle.description}
      </p>
    </div>
  )
}
