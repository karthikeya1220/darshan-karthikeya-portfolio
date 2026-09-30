import { Suspense } from "react"
import type { Metadata } from "next"
import type { ProfilePage, WithContext } from "schema-dts"

import { JSON_LD_ID } from "@/config/json-ld"
import { JsonLdScript } from "@/lib/json-ld"
import { absoluteUrl, cn } from "@/lib/utils"
import { CrosshairOverlay } from "@/components/crosshair-overlay"
import { SectionReveal } from "@/components/section-reveal"
import { SheetIndex } from "@/components/sheet-index"
import { AvailabilityConsole } from "@/features/portfolio/components/availability-console"
import { Awards } from "@/features/portfolio/components/awards"
import { Contact } from "@/features/portfolio/components/contact"
import { Education } from "@/features/portfolio/components/education"
import {
  CollegeExperiences,
  ProfessionalExperiences,
} from "@/features/portfolio/components/experiences"
import { GitHubContributions } from "@/features/portfolio/components/github-contributions"
import { Hello } from "@/features/portfolio/components/hello"
import {
  Insights,
  InsightsSkeleton,
} from "@/features/portfolio/components/insights"
import { Now } from "@/features/portfolio/components/now"
import { Overview } from "@/features/portfolio/components/overview"
import { ProfileHeader } from "@/features/portfolio/components/profile-header"
import { Projects } from "@/features/portfolio/components/projects"
import { TechFilterProvider } from "@/features/portfolio/components/tech-filter-context"
import { TechStack } from "@/features/portfolio/components/tech-stack"
import { TerminalCta } from "@/features/portfolio/components/terminal-cta"
import { Testimonials } from "@/features/portfolio/components/testimonials"
import { USER } from "@/features/portfolio/data/user"

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={getProfilePageJsonLd()} />

      <div
        className="pointer-events-none fixed inset-0 z-60 grain opacity-[0.05] mix-blend-overlay"
        aria-hidden
      />
      <SheetIndex />
      <CrosshairOverlay />

      <div className="[--separator-height:--spacing(8)] **:data-[slot=panel]:scroll-mt-[calc(var(--header-height)+var(--separator-height))]">
        <TechFilterProvider>
          <div className="mx-auto md:max-w-3xl">
            <ProfileHeader />
            <Separator />

            <Overview />
            <GitHubContributions />
            <Separator />

            <Hello />
            <Separator />

            <TechStack />
            <Separator />

            <ProfessionalExperiences />
            <Separator />

            <CollegeExperiences />
            <Separator />

            <Education />
            <Separator />

            <Projects />
            <Separator />

            <Awards />
            <Separator />

            <SectionReveal>
              <Testimonials />
            </SectionReveal>
            <Separator />

            <SectionReveal>
              <AvailabilityConsole />
            </SectionReveal>
            <Separator />

            <SectionReveal>
              <TerminalCta />
            </SectionReveal>
            <Separator />

            <SectionReveal>
              <Contact />
            </SectionReveal>
            <Separator />

            <SectionReveal>
              <Now />
            </SectionReveal>
            <Separator />

            <Suspense fallback={<InsightsSkeleton />}>
              <Insights />
            </Suspense>
          </div>
        </TechFilterProvider>
      </div>
    </>
  )
}

function getProfilePageJsonLd(): WithContext<ProfilePage> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/"),
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    // Reference the Person defined in the WebSite node (rendered globally in
    // the root layout) so both blocks resolve to the same entity.
    mainEntity: { "@id": JSON_LD_ID.person },
  }
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "stripe-divider h-(--separator-height) w-full border-x",
        className
      )}
    >
      {/* <div
        className="absolute -top-1.25 -left-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      />
      <div
        className="absolute -top-1.25 -right-1.25 z-2 flex size-2.25 border bg-background"
        aria-hidden
      /> */}
    </div>
  )
}
