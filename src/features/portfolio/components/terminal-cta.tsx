"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/features/portfolio/components/panel"
import { PanelTitleCopy } from "@/features/portfolio/components/panel-title-copy"

const ID = "terminal"

const PROMPT = "guest@portfolio:~$"
const COMMAND = "hire darshan"
const OUTPUT = "ok: channel open"
const COMMAND_INTERVAL_MS = 60
const OUTPUT_INTERVAL_MS = 24
const OUTPUT_DELAY_MS = 400
const CTA_DELAY_MS = 250

/**
 * Terminal easter egg between availability and contact: types `hire darshan`
 * on scroll, prints a success line, and reveals a get-in-touch prompt.
 */
export function TerminalCta() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [cmdChars, setCmdChars] = useState(0)
  const [outChars, setOutChars] = useState(0)
  const [showCta, setShowCta] = useState(false)

  // Reduced motion skips the sequence and renders the final transcript.
  const finished = !!reduce && inView
  const command = finished ? COMMAND : COMMAND.slice(0, cmdChars)
  const output = finished ? OUTPUT : OUTPUT.slice(0, outChars)
  const ctaVisible = finished || showCta

  useEffect(() => {
    if (!inView || reduce) return

    let cancelled = false
    let cmd = 0
    let out = 0
    const cleanups: Array<() => void> = []

    const commandInterval = setInterval(() => {
      if (cancelled) return
      cmd += 1
      setCmdChars(cmd)
      if (cmd >= COMMAND.length) {
        clearInterval(commandInterval)
        const outputTimeout = setTimeout(() => {
          if (cancelled) return
          const outputInterval = setInterval(() => {
            if (cancelled) return
            out += 1
            setOutChars(out)
            if (out >= OUTPUT.length) {
              clearInterval(outputInterval)
              const ctaTimeout = setTimeout(() => {
                if (!cancelled) setShowCta(true)
              }, CTA_DELAY_MS)
              cleanups.push(() => clearTimeout(ctaTimeout))
            }
          }, OUTPUT_INTERVAL_MS)
          cleanups.push(() => clearInterval(outputInterval))
        }, OUTPUT_DELAY_MS)
        cleanups.push(() => clearTimeout(outputTimeout))
      }
    }, COMMAND_INTERVAL_MS)
    cleanups.push(() => clearInterval(commandInterval))

    return () => {
      cancelled = true
      for (const cleanup of cleanups) cleanup()
    }
  }, [inView, reduce])

  const handleContact = () => {
    document.getElementById("contact")?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    })
    window.history.replaceState(null, "", "#contact")
  }

  return (
    <Panel id={ID}>
      <PanelHeader>
        <PanelTitle>
          <a href={`#${ID}`}>Terminal</a>
          <PanelTitleCopy id={ID} />
        </PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div
          ref={ref}
          className="overflow-hidden rounded-lg border border-border bg-muted/20 font-mono text-xs"
        >
          <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
            <span
              className="size-2 rounded-full border border-border"
              aria-hidden
            />
            <span
              className="size-2 rounded-full border border-border"
              aria-hidden
            />
            <span
              className="size-2 rounded-full border border-border"
              aria-hidden
            />
            <span className="ml-2 truncate text-muted-foreground">
              bash — guest@portfolio
            </span>
          </div>

          <div className="space-y-1.5 p-3 sm:px-4">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <span className="text-muted-foreground">{PROMPT}</span>
              <span className="sr-only">{COMMAND}</span>
              <span aria-hidden className="text-foreground">
                {command}
                {command.length < COMMAND.length && <Caret />}
              </span>
            </div>

            <div className="flex min-h-[1.2em] flex-wrap items-baseline gap-x-2">
              <span className="sr-only">{OUTPUT}</span>
              <span aria-hidden className="text-muted-foreground">
                {output}
                {output.length > 0 && output.length < OUTPUT.length && (
                  <Caret />
                )}
              </span>
            </div>

            <div
              className={cn(
                "flex flex-wrap items-center gap-x-3 gap-y-1 pt-1",
                !ctaVisible && "invisible"
              )}
            >
              <button
                type="button"
                onClick={handleContact}
                className="rounded-sm text-foreground transition-colors outline-none hover:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <span className="text-muted-foreground">[</span> enter{" "}
                <span className="text-muted-foreground">]</span> get in touch →
              </button>
              <span className="flex items-baseline gap-x-2 text-muted-foreground">
                {PROMPT}
                <Caret />
              </span>
            </div>
          </div>
        </div>
      </PanelContent>
    </Panel>
  )
}

function Caret() {
  return (
    <span
      aria-hidden
      className="ml-px inline-block h-[1em] w-[0.55em] translate-y-[0.12em] animate-pulse bg-foreground motion-reduce:animate-none"
    />
  )
}
