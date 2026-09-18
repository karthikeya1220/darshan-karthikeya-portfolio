import { USER } from "@/features/portfolio/data/user"
import {
  Panel,
  PanelContent,
  PanelHeader,
} from "@/features/portfolio/components/panel"
import { HelloTitle } from "@/features/portfolio/components/hello-title"

const ID = "hello"

export function Hello() {
  return (
    <Panel id={ID} className="screen-line-bottom-none">
      <PanelHeader>
        <h2 className="sr-only">About</h2>
        <HelloTitle />
      </PanelHeader>

      <PanelContent>
        <div className="typeset typeset-description [&_li]:ps-0.5 [&_ul]:ps-3.5">
          <p>{USER.about}</p>
        </div>
      </PanelContent>

      <div className="screen-line-bottom h-px" />
      <div className="h-4" />
      <div className="screen-line-bottom h-px screen-line-bottom-border" />
    </Panel>
  )
}
