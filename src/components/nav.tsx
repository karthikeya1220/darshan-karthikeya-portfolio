"use client"

import React from "react"
import type { Route } from "next"
import Link from "next/link"

import type { NavItem as NavItemType } from "@/types/nav"
import { cn } from "@/lib/utils"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"

export function Nav({
  items,
  activeId,
  className,
  exactMatch = false,
}: {
  items: NavItemType<Route>[]
  activeId?: string
  className?: string
  exactMatch?: boolean
}) {
  return (
    <nav
      data-active-id={activeId}
      className={cn("flex items-center gap-4", className)}
    >
      {items.map(({ title, href }) => {
        const isActive = exactMatch
          ? activeId === href
          : activeId === href ||
            (href === "/" // Home page
              ? ["/", "/index"].includes(activeId || "")
              : activeId?.startsWith(href))

        return (
          <NavItem
            key={href}
            href={href}
            aria-current={isActive ? "page" : undefined}
          >
            {title}
          </NavItem>
        )
      })}
    </nav>
  )
}

export function NavItem({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Link>) {
  const [click] = useClickSound()

  return (
    <Link
      className={cn(
        "text-sm font-medium tracking-wide text-muted-foreground transition-[color] hover:text-foreground aria-[current=page]:text-foreground",
        className
      )}
      onClick={(event) => {
        click()
        onClick?.(event)
      }}
      {...props}
    />
  )
}
