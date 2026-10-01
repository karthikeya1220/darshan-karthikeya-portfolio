"use client"

import * as React from "react"

import OnyxGlyphPreloader from "@/components/ui/onyx-glyph-preloader"

// The house monogram (same geometry as favicon.svg / site-header-mark.tsx),
// decomposed into non-overlapping rects: the component fills glyphs even-odd,
// so overlapping subpaths would punch holes.
const DK_MARK =
  "M18.75 21.875 h12.5 v56.25 h-12.5 Z M31.25 21.875 h12.5 v12.5 h-12.5 Z M31.25 65.625 h12.5 v12.5 h-12.5 Z M43.75 21.875 h12.5 v56.25 h-12.5 Z M56.25 37.5 h12.5 v12.5 h-12.5 Z M68.75 25 h12.5 v12.5 h-12.5 Z M56.25 50 h12.5 v12.5 h-12.5 Z M68.75 62.5 h12.5 v12.5 h-12.5 Z"

const PROFILE_GLYPHS = [
  {
    d: "M38 26 L18 50 L38 74 M62 26 L82 50 L62 74",
    stroke: 9,
    label: "Code",
  },
  { d: "M22 32 L44 50 L22 68 M52 70 H78", stroke: 9, label: "Terminal" },
  {
    d: "M50 13 C53 40 60 47 87 50 C60 53 53 60 50 87 C47 60 40 53 13 50 C40 47 47 40 50 13 Z",
    label: "AI",
  },
  {
    d: "M50 90 C50 90 20 60 20 40 A30 30 0 0 1 80 40 C80 60 50 90 50 90 Z M62 40 A12 12 0 1 1 38 40 A12 12 0 1 1 62 40 Z",
    label: "Origin",
  },
  {
    d: "M50 16 L84 34 L50 52 L16 34 Z M16 50 L50 68 L84 50 M16 64 L50 82 L84 64",
    stroke: 8,
    label: "Stack",
  },
]

export function SiteLoadingGate({ children }: { children: React.ReactNode }) {
  const [gate, setGate] = React.useState(true)
  const [locked, setLocked] = React.useState(false)

  React.useEffect(() => {
    if (!gate) return
    setLocked(true)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
      setLocked(false)
    }
  }, [gate])

  return (
    <>
      {/* Gate first in the DOM: the server streams it before the site markup,
          so the first paint is the black stage, never a flash of content.
          The inline background covers the gap before the component's own
          <style> inside .ogp-root is parsed. */}
      {gate ? (
        <div
          className="site-loading-gate fixed inset-0 z-200"
          style={{ background: "#030303" }}
        >
          <style>
            {`.site-loading-gate .ogp-word {
  white-space: normal;
  font-size: max(18px, calc(var(--ogp-u) * 0.05));
}`}
          </style>
          <OnyxGlyphPreloader
            hud
            durationMs={3600}
            word="DARSHAN KARTHIKEYA"
            caption="Full stack · applied AI"
            mark={{ d: DK_MARK, label: "DK" }}
            glyphs={PROFILE_GLYPHS}
            fontFamily="var(--font-geist-sans), system-ui, sans-serif"
            onComplete={() => setGate(false)}
          />
        </div>
      ) : null}
      <div className="contents" inert={locked}>
        {children}
      </div>
      <noscript>
        <style>{".site-loading-gate{display:none!important}"}</style>
      </noscript>
    </>
  )
}
