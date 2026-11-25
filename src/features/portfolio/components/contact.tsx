import { ClockIcon, ExternalLinkIcon, MailIcon, MapPinIcon } from "lucide-react"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "@/features/portfolio/components/overview/intro-item"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { USER } from "@/features/portfolio/data/user"

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
                className="break-all"
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

        <div className="mt-4 flex flex-wrap gap-2.5">
          <a
            href={`mailto:${atob(USER.emailB64)}`}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-all hover:opacity-90 touch-manipulation active:scale-[0.98]"
          >
            <MailIcon className="size-4" />
            Send an email
          </a>
          <a
            href="https://linkedin.com/in/darshan-karthikeya"
            target="_blank"
            rel="noopener"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border px-5 text-sm font-medium transition-colors hover:bg-accent touch-manipulation active:scale-[0.98]"
          >
            <ExternalLinkIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </PanelContent>
    </Panel>
  )
}
