"use client"

import { useCallback, useState } from "react"
import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/types/nav"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function NavMobile({ items }: { items: NavItem<string>[] }) {
  const [open, setOpen] = useState(false)

  const isDesktop = useMediaQuery("(min-width: 40rem)") // sm breakpoint

  const pathname = usePathname()

  const [click] = useClickSound()

  const handleOpenChange = useCallback((open: boolean) => {
    setOpen(open)
  }, [])

  if (isDesktop) {
    return <NavMobileTrigger />
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal>
      <PopoverTrigger render={<NavMobileTrigger />} />

      <PopoverContent
        className="w-56 max-h-[70vh] overflow-y-auto rounded-xl p-1.5 shadow-xl"
        side="top"
        align="end"
        sideOffset={10}
        finalFocus={false}
      >
        <div className="flex flex-col gap-0.5">
          <div className="px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
            Navigation
          </div>
          {items.map((link) => {
            const isHash = link.href.includes("#")
            const hash = isHash ? link.href.split("#")[1] : null
            const isActive =
              !isHash &&
              (pathname === link.href ||
                (link.href === "/"
                  ? ["/", "/index"].includes(pathname || "")
                  : pathname?.startsWith(link.href)))

            return (
              <Link
                key={link.href}
                href={link.href as Route}
                aria-current={isActive ? "page" : undefined}
                className="flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent aria-[current=page]:bg-accent active:bg-accent/80 touch-manipulation"
                onClick={(e) => {
                  click()
                  handleOpenChange(false)
                  if (hash && (pathname === "/" || pathname === "")) {
                    const el = document.getElementById(hash)
                    if (el) {
                      e.preventDefault()
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                      window.history.replaceState(null, "", `#${hash}`)
                    }
                  }
                }}
              >
                {link.title}
              </Link>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default NavMobile

function NavMobileTrigger(
  props: Omit<React.ComponentProps<typeof Button>, "children">
) {
  const [click] = useClickSound()
  const { onClick, ...rest } = props

  return (
    <Button
      className="group relative flex touch-manipulation flex-col gap-1 border-none before:absolute before:-inset-x-2 before:-top-8 before:-bottom-1 active:scale-none aria-expanded:bg-accent"
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle Menu"
      onClick={(event) => {
        click()
        onClick?.(event)
      }}
      {...rest}
    >
      <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-popup-open:translate-y-0.75 group-data-popup-open:rotate-45" />
      <span className="flex h-0.5 w-4 transform rounded-[1px] bg-foreground transition-transform group-data-popup-open:-translate-y-0.75 group-data-popup-open:-rotate-45" />
    </Button>
  )
}
