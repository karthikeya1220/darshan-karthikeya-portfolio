import { QuoteIcon } from "lucide-react"

import { TESTIMONIALS } from "@/features/portfolio/data/testimonials"
import { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup } from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "testimonials"

export function Testimonials() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>What people say</a>
          <PanelTitleSup>({TESTIMONIALS.length})</PanelTitleSup>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <PanelContent className="space-y-4">
        {TESTIMONIALS.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="screen-line-top space-y-2 py-4 first:border-none first:pt-0"
          >
            <div className="flex items-start gap-2">
              <QuoteIcon className="size-4 shrink-0 text-muted-foreground/50 mt-0.5" aria-hidden />
              <blockquote className="text-sm/relaxed text-muted-foreground">
                {testimonial.content}
              </blockquote>
            </div>
            <figcaption className="pl-6 text-sm">
              <span className="font-medium text-foreground">{testimonial.name}</span>
              <span className="text-muted-foreground"> / </span>
              <span className="text-muted-foreground">{testimonial.role}</span>
              <span className="text-muted-foreground"> at </span>
              <span className="text-muted-foreground">{testimonial.company}</span>
            </figcaption>
          </figure>
        ))}
      </PanelContent>
    </Panel>
  )
}
