"use client"

import { useEffect, useRef } from "react"

/**
 * Full-viewport hairline crosshair with a mono coordinate readout.
 * Fine-pointer devices only; homepage overlay, does not capture events.
 */
export function CrosshairOverlay() {
  const rootRef = useRef<HTMLDivElement>(null)
  const verticalRef = useRef<HTMLDivElement>(null)
  const horizontalRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    const vertical = verticalRef.current
    const horizontal = horizontalRef.current
    const label = labelRef.current
    if (!root || !vertical || !horizontal || !label) return
    if (!window.matchMedia("(pointer: fine)").matches) return

    let frame = 0
    let x = 0
    let y = 0

    const paint = () => {
      frame = 0
      vertical.style.transform = `translate3d(${x}px,0,0)`
      horizontal.style.transform = `translate3d(0,${y}px,0)`
      label.textContent = `X ${String(Math.round(x)).padStart(4, "0")} · Y ${String(Math.round(y)).padStart(4, "0")}`
      const labelX = Math.min(x + 14, window.innerWidth - label.offsetWidth - 8)
      const labelY = Math.min(y + 14, window.innerHeight - 24)
      label.style.transform = `translate3d(${labelX}px,${labelY}px,0)`
    }

    const onMouseMove = (event: MouseEvent) => {
      x = event.clientX
      y = event.clientY
      root.style.opacity = "1"
      if (!frame) frame = requestAnimationFrame(paint)
    }

    const hide = () => {
      root.style.opacity = "0"
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", hide)
    window.addEventListener("blur", hide)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", hide)
      window.removeEventListener("blur", hide)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed inset-0 z-40 hidden opacity-0 transition-opacity duration-200 md:block"
      aria-hidden
    >
      <div
        ref={verticalRef}
        className="absolute top-0 left-0 h-full w-px bg-muted-foreground/40"
      />
      <div
        ref={horizontalRef}
        className="absolute top-0 left-0 h-px w-full bg-muted-foreground/40"
      />
      <div
        ref={labelRef}
        className="absolute top-0 left-0 border border-line bg-background/90 px-1 py-0.5 font-mono text-[10px]/none whitespace-nowrap text-muted-foreground tabular-nums"
      />
    </div>
  )
}
