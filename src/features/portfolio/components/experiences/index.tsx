import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Panel,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import {
  COLLEGE_EXPERIENCES,
  PROFESSIONAL_EXPERIENCES,
} from "@/features/portfolio/data/experiences"
import type { Experience } from "@/features/portfolio/types/experiences"

import { CollegeLedger } from "./college-ledger"
import { ExperienceItem } from "./experience-item"
import { LeadershipLoadChart } from "./leadership-load-chart"
import { ScopeDiagram } from "./scope-diagram"
import { TenureChart } from "./tenure-chart"

const MAX = 3

export function ProfessionalExperiences() {
  return (
    <ExperienceSection
      id="professional-experience"
      title="Professional Experience"
      experiences={PROFESSIONAL_EXPERIENCES}
      intro={<TenureChart experiences={PROFESSIONAL_EXPERIENCES} />}
    />
  )
}

export function CollegeExperiences() {
  return (
    <ExperienceSection
      id="college-experience"
      title="College Club Experience"
      experiences={COLLEGE_EXPERIENCES}
      intro={
        <>
          <CollegeLedger experiences={COLLEGE_EXPERIENCES} />
          <ScopeDiagram experiences={COLLEGE_EXPERIENCES} />
        </>
      }
      outro={<LeadershipLoadChart experiences={COLLEGE_EXPERIENCES} />}
    />
  )
}

function ExperienceSection({
  id,
  title,
  experiences,
  intro,
  outro,
}: {
  id: string
  title: string
  experiences: Experience[]
  intro?: React.ReactNode
  outro?: React.ReactNode
}) {
  return (
    <Panel id={id}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${id}`}>{title}</a>
          <PanelTitleCopy id={id} />
        </PanelTitle>
      </PanelHeader>

      {intro}

      <div className="pr-2 pl-4">
        <ExperienceList experiences={experiences.slice(0, MAX)} />
      </div>

      {experiences.length > MAX && (
        <Collapsible className="group/collapsible">
          <CollapsibleContent render={<div className="pr-2 pl-4" />}>
            <ExperienceList experiences={experiences.slice(MAX)} />
          </CollapsibleContent>

          <div className="-mt-px flex items-center justify-center py-4">
            <CollapsibleTrigger
              render={
                <Button
                  className="gap-2 pr-2.5 pl-3 shadow-[inset_0_0_1px] shadow-foreground/20"
                  variant="secondary"
                  size="sm"
                >
                  <span className="hidden group-data-closed/collapsible:block">
                    Show more
                  </span>

                  <span className="hidden group-data-open/collapsible:block">
                    Show less
                  </span>

                  <ChevronDownIcon className="group-data-open/collapsible:rotate-180" />
                </Button>
              }
            />
          </div>
        </Collapsible>
      )}

      {outro}
    </Panel>
  )
}

function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </>
  )
}
