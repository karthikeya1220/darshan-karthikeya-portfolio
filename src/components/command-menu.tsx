"use client"

import React, { useCallback, useEffect, useState } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { useRouter } from "@bprogress/next/app"
import {
  BriefcaseBusinessIcon,
  CornerDownLeftIcon,
  DownloadIcon,
  GraduationCapIcon,
  MoonStarIcon,
  SunMediumIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { useHotkeys } from "react-hotkeys-hook"

import { trackEvent } from "@/lib/events"
import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command"
import { toast } from "@/components/ui/toast"
import type { DocPreview } from "@/features/doc/types/document"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"

import {
  FavouriteIcon,
  GridViewIcon,
  NewsIcon,
  ReactIcon,
  SearchIcon,
} from "./icons"
import { Button } from "./ui/button"
import { Kbd, KbdGroup } from "./ui/kbd"

type CommandKind =
  | "command"
  | "page"
  | "link"
  | "component"
  | "block"
  | "bookmark"

type CommandLinkItem = {
  title: string
  href: string
  kind: CommandKind
  icon?: React.ReactElement
  iconImage?: string
  shortcut?: string
  keywords?: string[]
  openInNewTab?: boolean
}

const MENU_LINKS: CommandLinkItem[] = [
  {
    title: "Home",
    href: "/",
    kind: "page",
    shortcut: "GH",
  },
]

const PORTFOLIO_LINKS: CommandLinkItem[] = [
  {
    title: "Hello",
    href: "/#hello",
    kind: "page",
  },
  {
    title: "Experience",
    href: "/#experience",
    kind: "page",
    icon: <BriefcaseBusinessIcon />,
  },
  {
    title: "Education",
    href: "/#education",
    kind: "page",
    icon: <GraduationCapIcon />,
  },
]

const SOCIAL_LINK_ITEMS: CommandLinkItem[] = SOCIAL_LINKS.map((item) => ({
  title: item.title,
  href: item.href,
  kind: "link",
  icon: SOCIAL_ICONS[item.name],
  openInNewTab: true,
}))

const OTHER_LINK_ITEMS: CommandLinkItem[] = [
  {
    title: "Download vCard",
    href: "/vcard",
    kind: "command",
    icon: <DownloadIcon />,
  },
]

type CommandMenuItemProps = React.ComponentProps<typeof CommandItem> & {
  onHighlight?: () => void
}

function CommandMenuItem({
  onHighlight,
  children,
  ...props
}: CommandMenuItemProps) {
  return (
    <CommandItem
      onFocus={onHighlight}
      onMouseEnter={onHighlight}
      {...props}
    >
      {children}
    </CommandItem>
  )
}

export function CommandMenu({
  docs,
  enabledHotkeys = false,
}: {
  docs: DocPreview[]
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [selectedCommandKind, setSelectedCommandKind] =
    useState<CommandKind | null>(null)

  const [click] = useClickSound()

  useHotkeys(
    "mod+k, slash",
    (e) => {
      e.preventDefault()

      setOpen((open) => {
        if (!open) {
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "keyboard",
              key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
            },
          })
        }
        return !open
      })
    },
    { enabled: enabledHotkeys }
  )

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "navigate",
          href: href,
          open_in_new_tab: openInNewTab,
        },
      })

      if (openInNewTab) {
        window.open(href, "_blank", "noopener")
      } else {
        router.push(href)
      }
    },
    [router]
  )

  const handleCopyText = useCallback(
    (text: string, message: string) => {
      setOpen(false)
      copyToClipboardWithEvent(text, {
        name: "command_menu_action",
        properties: {
          action: "copy",
          text: text,
        },
      })
      toast.add({ type: "success", title: message })
    },
    []
  )

  const createThemeHandler = useCallback(
    (theme: "light" | "dark" | "system") => () => {
      click()
      setOpen(false)

      trackEvent({
        name: "command_menu_action",
        properties: {
          action: "change_theme",
          theme: theme,
        },
      })

      setTheme(theme)
    },
    [click, setTheme]
  )

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-muted-foreground"
        onClick={() => {
          setOpen(true)
          trackEvent({
            name: "open_command_menu",
            properties: {
              method: "click",
            },
          })
        }}
        data-slot="command-menu-trigger"
      >
        <SearchIcon className="size-3.5" />
        <span className="max-sm:hidden">Search</span>
        <KbdGroup className="max-sm:hidden">
          <Kbd>
            <span className="text-[10px]">&#8984;</span>
          </Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Pages">
            {MENU_LINKS.map((item) => (
              <CommandMenuItem
                key={item.href}
                keywords={item.keywords}
                onHighlight={() => setSelectedCommandKind(item.kind)}
                onSelect={() => handleOpenLink(item.href)}
              >
                {item.icon}
                <p className="line-clamp-1">{item.title}</p>
                {item.shortcut && (
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                )}
              </CommandMenuItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Sections">
            {PORTFOLIO_LINKS.map((item) => (
              <CommandMenuItem
                key={item.href}
                onHighlight={() => setSelectedCommandKind(item.kind)}
                onSelect={() => handleOpenLink(item.href)}
              >
                {item.icon}
                <p className="line-clamp-1">{item.title}</p>
                {item.shortcut && (
                  <CommandShortcut>{item.shortcut}</CommandShortcut>
                )}
              </CommandMenuItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Links">
            {SOCIAL_LINK_ITEMS.map((item) => (
              <CommandMenuItem
                key={item.href}
                onHighlight={() => setSelectedCommandKind(item.kind)}
                onSelect={() => handleOpenLink(item.href, item.openInNewTab)}
              >
                {item.icon}
                <p className="line-clamp-1">{item.title}</p>
              </CommandMenuItem>
            ))}
          </CommandGroup>

          <CommandGroup heading="Theme">
            <CommandMenuItem
              onHighlight={() => setSelectedCommandKind("command")}
              onSelect={createThemeHandler("light")}
            >
              <SunMediumIcon />
              Light
            </CommandMenuItem>
            <CommandMenuItem
              onHighlight={() => setSelectedCommandKind("command")}
              onSelect={createThemeHandler("dark")}
            >
              <MoonStarIcon />
              Dark
            </CommandMenuItem>
            <CommandMenuItem
              onHighlight={() => setSelectedCommandKind("command")}
              onSelect={createThemeHandler("system")}
            >
              <FavouriteIcon />
              System
            </CommandMenuItem>
          </CommandGroup>
        </CommandList>

        <div className="absolute inset-x-0 bottom-0 flex h-10 items-center justify-between gap-2 rounded-b-2xl px-4 text-xs font-medium">
          <div className="flex items-center gap-2 max-sm:hidden">
            <span>
              {selectedCommandKind === "link" ? "Open" : "Navigate"}
            </span>
            <Kbd>
              <CornerDownLeftIcon className="size-3" />
            </Kbd>
          </div>
        </div>
      </CommandDialog>
    </>
  )
}

export default CommandMenu
