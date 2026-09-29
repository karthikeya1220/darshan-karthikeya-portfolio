import { compareDesc } from "date-fns"

import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelTitleSup,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { AWARDS } from "@/features/portfolio/data/awards"

import { AwardPlaque } from "./award-plaque"

const SORTED_AWARDS = [...AWARDS].sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date))
})

const ID = "awards"

export function Awards() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Awards</a>
          <PanelTitleSup>({AWARDS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {SORTED_AWARDS.map((award) => (
          <AwardPlaque key={award.id} award={award} />
        ))}
      </div>
    </Panel>
  )
}
