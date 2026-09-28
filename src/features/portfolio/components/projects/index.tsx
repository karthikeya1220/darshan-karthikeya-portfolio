import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { PROJECTS } from "@/features/portfolio/data/projects"

import { BuildLog } from "./build-log"
import { MaterialsSchedule } from "./materials-schedule"
import { ProjectSheet } from "./project-sheet"

const ID = "projects"

export function Projects() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Projects</a>
          <PanelTitleSup>({PROJECTS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <BuildLog projects={PROJECTS} />

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectSheet key={project.id} project={project} index={index} />
        ))}
      </div>

      <MaterialsSchedule projects={PROJECTS} />
    </Panel>
  )
}
