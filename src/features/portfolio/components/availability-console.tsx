"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDownIcon, CheckIcon, CopyIcon } from "lucide-react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { Button, buttonVariants } from "@/components/ui/button"
import { Magnet } from "@/components/react-bits/magnet"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"
import { USER } from "@/features/portfolio/data/user"

const ID = "availability"

const STATUS = "open to opportunities"
const REPLY_TIME = "usually within 24 hours"
const LOCATION = "India · UTC+05:30"
const FOCUS = "full-stack · applied AI"
const CLOCK_LABEL = "IST"
const TYPE_INTERVAL_MS = 45

/**
 * Terminal-style status bridge between testimonials and contact: live status
 * LED, ticking clock, typed reply-time line, and a magnetic copy-email button.
 */
export function AvailabilityConsole() {
  const reduce = useReducedMotion()
  const typedRef = useRef<HTMLDivElement>(null)
  const typedInView = useInView(typedRef, { once: true, margin: "-60px" })
  const [typed, setTyped] = useState("")
  const [clock, setClock] = useState("")
  const { state: copyState, copy } = useCopyToClipboard()

  const [click] = useClickSound()

  // Reduced motion shows the full line without animating through it.
  const displayTyped = reduce && typedInView ? REPLY_TIME : typed
  const typingDone = displayTyped.length >= REPLY_TIME.length

  useEffect(() => {
    const tick = () => {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: USER.timeZone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      )
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!typedInView || reduce) return

    let index = 0
    const interval = setInterval(() => {
      index += 1
      setTyped(REPLY_TIME.slice(0, index))
      if (index >= REPLY_TIME.length) clearInterval(interval)
    }, TYPE_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [typedInView, reduce])

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Availability</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="space-y-3 rounded-lg border border-dashed border-border bg-muted/20">
          <div className="flex items-center justify-between gap-3 border-b border-dashed border-border px-3 py-2.5 sm:px-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="relative flex size-2 shrink-0" aria-hidden>
                <span className="absolute size-full animate-ping rounded-full bg-foreground opacity-60 motion-reduce:animate-none" />
                <span className="relative size-2 rounded-full bg-foreground" />
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                Status
              </span>
              <span className="truncate font-mono text-xs text-foreground">
                {STATUS}
              </span>
            </div>
            <span
              className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums"
              suppressHydrationWarning
            >
              {clock || "--:--:--"} {CLOCK_LABEL}
            </span>
          </div>

          <div ref={typedRef} className="space-y-2.5 p-3 sm:px-4">
            <StatusRow label="Reply time">
              <span className="sr-only">{REPLY_TIME}</span>
              <span aria-hidden>
                {displayTyped}
                {!typingDone && (
                  <span className="ml-px inline-block h-[1em] w-[0.55em] translate-y-[0.12em] animate-pulse bg-foreground motion-reduce:animate-none" />
                )}
              </span>
            </StatusRow>
            <StatusRow label="Based in">{LOCATION}</StatusRow>
            <StatusRow label="Focus">{FOCUS}</StatusRow>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-dashed border-border p-3 sm:px-4">
            <Magnet
              disabled={!!reduce}
              padding={48}
              magnetStrength={2.5}
              wrapperClassName="shrink-0"
            >
              <Button
                variant="outline"
                size="sm"
                className="font-mono text-xs"
                aria-label={
                  copyState === "done"
                    ? "Email copied to clipboard"
                    : "Copy email address"
                }
                onClick={() => {
                  click()
                  copy(() => atob(USER.emailB64))
                }}
              >
                {copyState === "done" ? (
                  <CheckIcon aria-hidden />
                ) : (
                  <CopyIcon aria-hidden />
                )}
                {copyState === "done" ? "Copied" : "Copy email"}
              </Button>
            </Magnet>

            <a
              href="#contact"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "font-mono text-xs"
              )}
            >
              Get in touch
              <ArrowDownIcon aria-hidden />
            </a>
          </div>
        </div>
      </PanelContent>
    </Panel>
  )
}

function StatusRow({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-baseline gap-2 text-xs">
      <span className="font-mono tracking-widest text-muted-foreground/70 uppercase">
        {label}
      </span>
      <span
        aria-hidden
        className="min-w-4 flex-1 -translate-y-1 border-b border-dotted border-border"
      />
      <span className="font-mono text-foreground">{children}</span>
    </div>
  )
}
