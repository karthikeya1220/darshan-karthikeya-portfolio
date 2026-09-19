import { MailIcon, MapPinIcon, ClockIcon, ExternalLinkIcon } from "lucide-react"

import { USER } from "@/features/portfolio/data/user"
import { Panel, PanelContent, PanelHeader, PanelTitle } from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { IntroItem, IntroItemContent, IntroItemIcon, IntroItemLink } from "@/features/portfolio/components/overview/intro-item"

const ID = "contact"

export function Contact() {
  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Get in touch</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-3">
          <IntroItem>
            <IntroItemIcon>
              <MailIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`mailto:${atob(USER.emailB64)}`}
                aria-label={`Email: ${atob(USER.emailB64)}`}
              >
                {atob(USER.emailB64)}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <span>{USER.address}</span>
            </IntroItemContent>
          </IntroItem>

          <IntroItem>
            <IntroItemIcon>
              <ClockIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <span>Usually responds within 24 hours</span>
            </IntroItemContent>
          </IntroItem>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`mailto:${atob(USER.emailB64)}`}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <MailIcon className="size-4" />
            Send an email
          </a>
          <a
            href="https://linkedin.com/in/darshan-karthikeya"
            target="_blank"
            rel="noopener"
            className="inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors hover:bg-accent"
          >
            <ExternalLinkIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </PanelContent>
    </Panel>
  )
}
