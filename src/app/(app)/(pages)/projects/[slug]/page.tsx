import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeftIcon, ExternalLinkIcon } from "lucide-react"
import { addQueryParams } from "@/utils/url"

import { UTM_PARAMS } from "@/config/site"
import { Button } from "@/components/ui/button"
import { Tag } from "@/components/ui/tag"
import { PROJECTS } from "@/features/portfolio/data/projects"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel"

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.id }))
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = PROJECTS.find((p) => p.id === slug)

  if (!project) {
    notFound()
  }

  const { start, end } = project.period
  const isOngoing = !end

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground"
          render={<Link href="/" />}
        >
          <ArrowLeftIcon className="size-4" />
          Back to portfolio
        </Button>
      </div>

      <Panel id={`project-${project.id}`}>
        <PanelHeader>
          <PanelTitle>
            <a href={`#project-${project.id}`}>{project.title}</a>
          </PanelTitle>
        </PanelHeader>

        <PanelContent className="space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="tabular-nums">
              {start}
              {!isOngoing && (
                <>
                  {" — "}
                  {end}
                </>
              )}
              {isOngoing && " — Present"}
            </span>

            <a
              href={addQueryParams(project.link, UTM_PARAMS)}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-1 font-medium text-foreground hover:underline"
            >
              View project
              <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>

          {project.description && (
            <div className="typeset typeset-description">
              <p>{project.description}</p>
            </div>
          )}

          {project.skills.length > 0 && (
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Technologies
              </h3>
              <ul className="flex flex-wrap gap-1.5">
                {project.skills.map((skill, index) => (
                  <li key={index} className="flex">
                    <Tag>{skill}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </PanelContent>
      </Panel>
    </div>
  )
}
