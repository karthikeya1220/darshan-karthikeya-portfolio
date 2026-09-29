"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"
import type {
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react"
import Image from "next/image"
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon } from "lucide-react"
import { animate, motion, useMotionValue, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export interface CarouselItem {
  id: string | number
  stat: string
  quote: string
  author: string
  role: string
  defaultImage: string
  selectedImage: string
  alt?: string
  caseStudyHref?: string
  sourceHref?: string
}

export interface CalendlyCarouselProps extends HTMLAttributes<HTMLDivElement> {
  items: CarouselItem[]
  autoPlayInterval?: number
  pauseOnHover?: boolean
  label?: string
}

type ScreenTier = "mobile" | "tablet" | "desktop"

type DragState = {
  pointerId: number
  startX: number
  startTime: number
  dx: number
}

const VISIBLE_OFFSETS = [-4, -3, -2, -1, 0, 1, 2, 3, 4] as const

const DRAG_ADVANCE_PX = 64
const DRAG_FLICK_MIN_PX = 24
const DRAG_FLICK_VELOCITY = 0.35
const DRAG_CLICK_SUPPRESS_PX = 8
// A backgrounded tab stops delivering frames; without a clamp the resumed
// delta would fast-forward the slide timer.
const MAX_FRAME_DELTA = 250

const TRANSITION_SPRING = {
  type: "spring",
  stiffness: 220,
  damping: 26,
  mass: 0.75,
} as const

const TIER_DESKTOP_MIN = 900
const TIER_TABLET_MIN = 560

export function CalendlyCarousel({
  items,
  autoPlayInterval = 6000,
  pauseOnHover = true,
  label = "Customer stories",
  className,
  ...props
}: CalendlyCarouselProps) {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const elapsedRef = useRef<number>(0)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<DragState | null>(null)
  const didDragRef = useRef(false)
  const dragAnimRef = useRef<{ stop: () => void } | null>(null)

  // State
  const uid = useId()
  const dragX = useMotionValue(0)
  const reduceMotion = useReducedMotion()
  const [page, setPage] = useState<number>(0)
  const [isHovered, setIsHovered] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const [tier, setTier] = useState<ScreenTier>("tablet")
  const [containerWidth, setContainerWidth] = useState<number>(768)

  // Global State/Hooks
  const total = items.length
  const activeIndex = ((page % total) + total) % total

  // Written imperatively: a state-driven fill would re-render all cards on
  // every animation frame.
  const setProgressFill = (ratio: number) => {
    const el = progressFillRef.current
    if (el) el.style.transform = `scaleX(${ratio})`
  }

  // Tier follows the container (the carousel may live in a narrow column,
  // so window.innerWidth would pick cards that clip).
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const applyWidth = (width: number) => {
      setContainerWidth(width)

      if (width >= TIER_DESKTOP_MIN) {
        setTier("desktop")
      } else if (width >= TIER_TABLET_MIN) {
        setTier("tablet")
      } else {
        setTier("mobile")
      }
    }

    applyWidth(el.getBoundingClientRect().width)

    const observer = new ResizeObserver((entries) => {
      applyWidth(entries[0].contentRect.width)
    })

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Autoplay stops while the carousel is scrolled out of view so slides do
  // not advance unseen.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
      },
      { threshold: 0.25 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const isPaused =
      (pauseOnHover && isHovered) || !isVisible || Boolean(reduceMotion)

    if (isPaused) {
      lastTimeRef.current = null
      return
    }

    const step = (timestamp: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = timestamp
      }

      const delta = Math.min(timestamp - lastTimeRef.current, MAX_FRAME_DELTA)
      lastTimeRef.current = timestamp
      elapsedRef.current += delta

      if (elapsedRef.current >= autoPlayInterval) {
        elapsedRef.current = 0
        lastTimeRef.current = null
        setPage((curr) => curr + 1)
        return
      }

      setProgressFill(elapsedRef.current / autoPlayInterval)
      animationFrameRef.current = requestAnimationFrame(step)
    }

    animationFrameRef.current = requestAnimationFrame(step)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      lastTimeRef.current = null
    }
  }, [page, pauseOnHover, isHovered, isVisible, autoPlayInterval, reduceMotion])

  // Handlers
  const handlePrev = useCallback(() => {
    elapsedRef.current = 0
    lastTimeRef.current = null
    setProgressFill(0)
    setPage((curr) => curr - 1)
  }, [])

  const handleNext = useCallback(() => {
    elapsedRef.current = 0
    lastTimeRef.current = null
    setProgressFill(0)
    setPage((curr) => curr + 1)
  }, [])

  const handleSelectTab = (event: MouseEvent<HTMLButtonElement>) => {
    const indexStr = event.currentTarget.dataset.index

    if (indexStr !== undefined) {
      const targetIdx = Number.parseInt(indexStr, 10)
      let diff = targetIdx - activeIndex

      if (diff > total / 2) {
        diff -= total
      } else if (diff < -total / 2) {
        diff += total
      }

      elapsedRef.current = 0
      lastTimeRef.current = null
      setProgressFill(0)
      setPage((curr) => curr + diff)
    }
  }

  const handleSelectCard = (event: MouseEvent<HTMLDivElement>) => {
    if (didDragRef.current) return

    const offsetStr = event.currentTarget.dataset.offset

    if (offsetStr !== undefined) {
      const offset = Number.parseInt(offsetStr, 10)

      if (offset !== 0) {
        elapsedRef.current = 0
        lastTimeRef.current = null
        setProgressFill(0)
        setPage((curr) => curr + offset)
      }
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      handlePrev()
    } else if (event.key === "ArrowRight") {
      handleNext()
    }
  }

  const finishDrag = (advance: boolean) => {
    const drag = dragRef.current
    dragRef.current = null

    if (!drag) return

    elapsedRef.current = 0
    lastTimeRef.current = null
    setProgressFill(0)

    if (advance && drag.dx !== 0) {
      setPage((curr) => (drag.dx < 0 ? curr + 1 : curr - 1))
    }

    dragAnimRef.current?.stop()
    dragAnimRef.current = animate(dragX, 0, TRANSITION_SPRING)
  }

  const handlePanelPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    if ((event.target as HTMLElement).closest("a, button")) return

    dragAnimRef.current?.stop()
    dragX.set(0)
    dragAnimRef.current = null
    didDragRef.current = false
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startTime: performance.now(),
      dx: 0,
    }

    elapsedRef.current = 0
    lastTimeRef.current = null
    setProgressFill(0)
  }

  const handlePanelPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const dx = event.clientX - drag.startX
    drag.dx = dx

    // Capture only past the drag threshold: capturing on pointerdown would
    // retarget a plain tap's click to the panel and break side-card clicks.
    if (!didDragRef.current && Math.abs(dx) > DRAG_CLICK_SUPPRESS_PX) {
      didDragRef.current = true
      try {
        event.currentTarget.setPointerCapture(event.pointerId)
      } catch {
        // Capture is best-effort.
      }
    }

    dragX.set(dx)
  }

  const handlePanelPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return

    const velocity =
      Math.abs(drag.dx) / Math.max(performance.now() - drag.startTime, 1)
    const advance =
      Math.abs(drag.dx) >= DRAG_ADVANCE_PX ||
      (Math.abs(drag.dx) > DRAG_FLICK_MIN_PX && velocity > DRAG_FLICK_VELOCITY)

    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // Capture may already be released.
    }

    finishDrag(advance)
  }

  const handlePanelPointerCancel = (
    event: ReactPointerEvent<HTMLDivElement>
  ) => {
    if (dragRef.current?.pointerId !== event.pointerId) return

    try {
      event.currentTarget.releasePointerCapture(event.pointerId)
    } catch {
      // Capture may already be released.
    }

    finishDrag(false)
  }

  const activeDimensions = {
    desktop: { width: 762, height: 513 },
    tablet: { width: 560, height: 440 },
    mobile: { width: Math.min(340, containerWidth - 56), height: 490 },
  }[tier]

  const cardTransition = reduceMotion ? { duration: 0 } : TRANSITION_SPRING

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative mx-auto flex w-full max-w-[1240px] flex-col items-center overflow-hidden py-4 outline-none select-none",
        className
      )}
      {...props}
    >
      <motion.div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-live="polite"
        onPointerDown={handlePanelPointerDown}
        onPointerMove={handlePanelPointerMove}
        onPointerUp={handlePanelPointerUp}
        onPointerCancel={handlePanelPointerCancel}
        className="relative flex w-full items-center justify-center"
        style={{
          height: activeDimensions.height,
          x: dragX,
          // Horizontal drags belong to the carousel; vertical still scrolls.
          touchAction: "pan-y",
        }}
      >
        {VISIBLE_OFFSETS.map((offset) => {
          const virtualIndex = page + offset
          const itemIndex = ((virtualIndex % total) + total) % total
          const item = items[itemIndex]
          const isActive = offset === 0

          const getVariant = () => {
            if (tier === "mobile") {
              const activeW = activeDimensions.width
              const activeH = activeDimensions.height
              const gap = 16
              const peekW = 60
              const peekH = 410

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                }
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - peekW,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -peekH / 2,
                  width: peekW,
                  height: peekH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              }

              return {
                x: offset < 0 ? -activeW / 2 - 220 : activeW / 2 + 220,
                y: -peekH / 2,
                width: peekW,
                height: peekH,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              }
            }

            if (tier === "tablet") {
              const activeW = 560
              const activeH = 440
              const gap = 18
              const sideW = 100
              const sideH = 340

              if (offset === 0) {
                return {
                  x: -activeW / 2,
                  y: -activeH / 2,
                  width: activeW,
                  height: activeH,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                }
              }

              if (offset === -1) {
                return {
                  x: -activeW / 2 - gap - sideW,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              }

              if (offset === 1) {
                return {
                  x: activeW / 2 + gap,
                  y: -sideH / 2,
                  width: sideW,
                  height: sideH,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              }

              return {
                x: offset < 0 ? -activeW / 2 - 240 : activeW / 2 + 240,
                y: -sideH / 2,
                width: 74,
                height: 205,
                opacity: 0,
                zIndex: 0,
                pointerEvents: "none" as const,
              }
            }

            switch (offset) {
              case 0:
                return {
                  x: -381,
                  y: -256.5,
                  width: 762,
                  height: 513,
                  opacity: 1,
                  zIndex: 0,
                  pointerEvents: "auto" as const,
                }
              case -1:
                return {
                  x: -506,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              case 1:
                return {
                  x: 401,
                  y: -172,
                  width: 105,
                  height: 344,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              case -2:
                return {
                  x: -596,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              case 2:
                return {
                  x: 522,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 1,
                  zIndex: 100,
                  pointerEvents: "auto" as const,
                }
              case -3:
                return {
                  x: -720,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                }
              case 3:
                return {
                  x: 646,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                }
              default:
                return {
                  x: offset < 0 ? -860 : 860,
                  y: -102.5,
                  width: 74,
                  height: 205,
                  opacity: 0,
                  zIndex: 0,
                  pointerEvents: "none" as const,
                }
            }
          }

          return (
            <motion.div
              key={virtualIndex}
              data-offset={offset}
              onClick={handleSelectCard}
              initial={false}
              animate={getVariant()}
              transition={cardTransition}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                willChange: "transform",
              }}
              className={cn(
                "overflow-visible rounded-[28px] bg-card text-card-foreground shadow-[0_10px_30px_rgba(95,109,119,0.08),0_4px_12px_rgba(95,109,119,0.06)] sm:rounded-[32px] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6),0_4px_12px_rgba(0,0,0,0.4)]",
                !isActive && "cursor-pointer"
              )}
            >
              {offset === -1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 z-100 flex items-center text-card"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="block size-full overflow-visible fill-current"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === 1 && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 z-100 flex items-center text-card"
                  style={{
                    width: 22,
                    height: 42,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 20 37.3338"
                    preserveAspectRatio="none"
                    className="block size-full overflow-visible fill-current"
                  >
                    <path d="M0 0C0 0 1.2422 13.5759 10 13.5759C18.7578 13.5759 20 0 20 0V37.3338C20 37.3338 18.7578 23.7578 10 23.7578C1.2422 23.7578 0 37.3338 0 37.3338V0Z" />
                  </svg>
                </div>
              )}

              {offset === -2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 z-100 flex items-center text-card"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    left: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="block size-full overflow-visible fill-current"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              {offset === 2 && tier === "desktop" && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 z-100 flex items-center text-card"
                  style={{
                    width: 18,
                    height: 28,
                    margin: "auto 0",
                    right: "calc(100% - 1px)",
                  }}
                >
                  <svg
                    viewBox="0 0 16 28"
                    preserveAspectRatio="none"
                    className="block size-full overflow-visible fill-current"
                  >
                    <path d="M0 0C0 0 0.993759 10.1818 8 10.1818C15.0062 10.1818 16 0 16 0V28C16 28 15.0062 17.8182 8 17.8182C0.993759 17.8182 0 28 0 28V0Z" />
                  </svg>
                </div>
              )}

              <div
                className="relative size-full overflow-hidden"
                style={{ borderRadius: "inherit" }}
              >
                <motion.div
                  initial={false}
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { duration: 0.22, ease: "easeOut" }
                  }
                  className={cn(
                    "absolute inset-0 p-2",
                    isActive && "pointer-events-none"
                  )}
                >
                  <div className="relative size-full overflow-hidden rounded-[20px] bg-muted sm:rounded-[24px]">
                    <Image
                      alt={item.alt || item.author}
                      src={item.defaultImage}
                      fill
                      unoptimized
                      loading="eager"
                      draggable={false}
                      style={{ objectFit: "cover" }}
                      className="size-full object-cover"
                    />
                  </div>
                </motion.div>

                <div
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "50%",
                    width: activeDimensions.width,
                    height: activeDimensions.height,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : offset < 0 ? -822 : 822,
                    }}
                    transition={cardTransition}
                    className={cn(
                      "flex size-full flex-col gap-3 p-4 sm:gap-4 sm:p-5 md:flex-row md:gap-6 md:p-6 lg:p-7",
                      !isActive && "pointer-events-none"
                    )}
                  >
                    <div className="flex min-w-0 flex-1 flex-col items-center justify-between gap-2 py-1 text-center sm:gap-3 md:items-start md:text-left">
                      <h3
                        title={item.stat}
                        className="w-full text-lg/tight font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl lg:text-4xl"
                      >
                        {item.stat}
                      </h3>

                      <div className="relative my-auto w-full min-w-0 py-1">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute top-0 right-full hidden pr-1 font-serif text-2xl text-foreground/40 select-none sm:text-3xl md:inline lg:text-4xl"
                        >
                          “
                        </span>

                        <p className="font-serif text-xs/snug text-foreground/85 sm:text-base md:text-lg">
                          “{item.quote}”
                        </p>
                      </div>

                      <div className="flex w-full max-w-full min-w-0 items-center justify-center overflow-hidden md:items-start md:justify-start">
                        <div className="flex max-w-full min-w-0 flex-col items-center md:items-start">
                          <span className="inline-flex w-fit shrink-0 items-center justify-center rounded-[4px] bg-secondary px-2.5 py-1 text-[11px] font-medium text-secondary-foreground select-none sm:text-xs">
                            <span className="font-semibold whitespace-nowrap">
                              {item.author}
                            </span>
                          </span>

                          <div className="relative z-10 -my-px flex h-[6px] shrink-0 items-center justify-center px-3 text-secondary md:justify-start">
                            <svg
                              className="block shrink-0 overflow-visible fill-current"
                              preserveAspectRatio="none"
                              viewBox="0 -2 14 12"
                              width="14"
                              height="10"
                            >
                              <path d="M0 -2 V0 C0 0 5.09091 0.49688 5.09091 4 C5.09091 7.50312 0 8 0 8 V10 H14 V8 C14 8 8.90909 7.50312 8.90909 4 C8.90909 0.49688 14 0 14 0 V-2 Z" />
                            </svg>
                          </div>

                          <span className="inline-flex w-fit max-w-full items-center justify-center rounded-[4px] bg-secondary px-2.5 py-1 text-[10px] font-medium text-muted-foreground select-none sm:text-xs">
                            <span title={item.role} className="truncate">
                              {item.role}
                            </span>
                          </span>
                        </div>
                      </div>

                      {(item.caseStudyHref || item.sourceHref) && (
                        <div className="flex w-full shrink-0 items-center justify-center gap-4 md:justify-start">
                          {item.caseStudyHref && (
                            <a
                              href={item.caseStudyHref}
                              className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                              Case study
                              <ArrowRightIcon className="size-3" aria-hidden />
                            </a>
                          )}

                          {item.sourceHref && (
                            <a
                              href={item.sourceHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest text-muted-foreground uppercase transition-colors hover:text-foreground"
                            >
                              Source
                              <ExternalLinkIcon
                                className="size-3"
                                aria-hidden
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="relative aspect-3/2 w-full shrink-0 overflow-hidden rounded-[18px] bg-muted ring-1 ring-border ring-inset sm:rounded-[22px] md:w-[clamp(220px,44%,340px)] md:flex-none md:self-center">
                      <Image
                        alt={item.alt || item.author}
                        src={item.selectedImage}
                        fill
                        unoptimized
                        loading="eager"
                        draggable={false}
                        style={{ objectFit: "contain" }}
                        className="size-full object-contain"
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      <div
        aria-hidden="true"
        className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-muted-foreground uppercase"
      >
        <span className="tabular-nums">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
        <span className="text-muted-foreground/50">·</span>
        <span>{items[activeIndex].author}</span>
      </div>

      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          type="button"
          aria-label="Previous project"
          onClick={handlePrev}
          className="flex size-7 cursor-pointer items-center justify-center rounded-[4px] border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowLeftIcon className="size-3.5" aria-hidden />
        </button>

        <div
          role="tablist"
          aria-label={`${label} tabs`}
          className="flex items-center gap-1.5"
        >
          {items.map((item, idx) => {
            const isSelected = idx === activeIndex

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                data-index={idx}
                id={`${uid}-tab-${idx}`}
                aria-controls={`${uid}-panel`}
                onClick={handleSelectTab}
                aria-selected={isSelected}
                aria-label={`Show ${item.author}`}
                tabIndex={isSelected ? 0 : -1}
                className={cn(
                  "h-[8px] cursor-pointer overflow-hidden rounded-[3px] border-0 p-0 transition-[width] duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  isSelected
                    ? "w-[80px] bg-secondary"
                    : "w-[8px] bg-secondary hover:bg-muted-foreground/30"
                )}
              >
                {isSelected && (
                  <div
                    ref={progressFillRef}
                    className="h-full rounded-[3px] bg-foreground"
                    style={{
                      transformOrigin: "0% 50%",
                      transform: "scaleX(0)",
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          aria-label="Next project"
          onClick={handleNext}
          className="flex size-7 cursor-pointer items-center justify-center rounded-[4px] border border-border text-muted-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <ArrowRightIcon className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  )
}
