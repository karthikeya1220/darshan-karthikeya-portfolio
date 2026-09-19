import { CodeIcon, BookOpenIcon, LightbulbIcon } from "lucide-react"

import { NOW } from "@/features/portfolio/data/now"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "now"

export function Now() {
  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Now</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-4">
        <NowGroup icon={<CodeIcon />} label="Building" items={NOW.building} />
        <NowGroup icon={<BookOpenIcon />} label="Reading" items={NOW.reading} />
        <NowGroup icon={<LightbulbIcon />} label="Learning" items={NOW.learning} />
      </PanelContent>
    </Panel>
  )
}

function NowGroup({
  icon,
  label,
  items,
}: {
  icon: React.ReactNode
  label: string
  items: readonly string[]
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        {icon}
        {label}
      </div>
      <ul className="space-y-1 pl-6">
        {items.map((item, index) => (
          <li key={index} className="text-sm text-muted-foreground list-disc marker:text-muted-foreground/50">
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}
