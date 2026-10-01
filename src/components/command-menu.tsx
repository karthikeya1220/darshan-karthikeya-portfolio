"use client"

import React, { useCallback, useState } from "react"
import { copyToClipboardWithEvent } from "@/utils/copy"
import { useRouter } from "@bprogress/next/app"
import {
  CopyIcon,
  CornerDownLeftIcon,
  DownloadIcon,
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
import { SHEETS } from "@/components/sheet-index"
import { SOCIAL_ICONS } from "@/features/portfolio/components/social-link-icons"
import { SOCIAL_LINKS } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

import { FavouriteIcon, SearchIcon } from "./icons"
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

const SECTION_LINK_ITEMS: CommandLinkItem[] = SHEETS.map((sheet) => ({
  title: sheet.label,
  href: `/#${sheet.id}`,
  kind: "page",
}))

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
    <CommandItem onFocus={onHighlight} onMouseEnter={onHighlight} {...props}>
      {children}
    </CommandItem>
  )
}

export function CommandMenu({
  enabledHotkeys = false,
}: {
  enabledHotkeys?: boolean
}) {
  const router = useRouter()

  const { setTheme } = useTheme()

  const [open, setOpen] = useState(false)

  const [selectedCommandKind, setSelectedCommandKind] =
    useState<CommandKind | null>(null)

  const [click] = useClickSound()

  const toggleFromKeyboard = useCallback((e: KeyboardEvent) => {
    e.preventDefault()

    setOpen((wasOpen) => {
      if (!wasOpen) {
        trackEvent({
          name: "open_command_menu",
          properties: {
            method: "keyboard",
            key: e.key === "/" ? "/" : e.metaKey ? "cmd+k" : "ctrl+k",
          },
        })
      }
      return !wasOpen
    })
  }, [])

  // One toggle per keypress: mod+k also works while typing in the search
  // input (the palette autofocuses it), slash stays page-level only.
  useHotkeys("mod+k", toggleFromKeyboard, {
    enabled: enabledHotkeys,
    enableOnFormTags: ["input"],
  })

  useHotkeys("slash", toggleFromKeyboard, {
    enabled: enabledHotkeys,
  })

  const handleOpenLink = useCallback(
    (href: string, openInNewTab = false) => {
      click()
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
    [click, router]
  )

  const handleCopyText = useCallback(
    (text: string, message: string) => {
      click()
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
    [click]
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

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 text-muted-foreground"
        onClick={() => {
          click()
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
            {SECTION_LINK_ITEMS.map((item) => (
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

          <CommandGroup heading="Commands">
            {OTHER_LINK_ITEMS.map((item) => (
              <CommandMenuItem
                key={item.href}
                onHighlight={() => setSelectedCommandKind(item.kind)}
                onSelect={() => handleOpenLink(item.href)}
              >
                {item.icon}
                <p className="line-clamp-1">{item.title}</p>
              </CommandMenuItem>
            ))}
            <CommandMenuItem
              onHighlight={() => setSelectedCommandKind("command")}
              onSelect={() =>
                handleCopyText(atob(USER.emailB64), "Email copied")
              }
            >
              <CopyIcon />
              Copy email
            </CommandMenuItem>
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

        {/* In-flow below the scrollable list: an absolute overlay here would
            sit on top of the last rows, hiding and blocking them. */}
        <div className="flex h-10 shrink-0 items-center justify-between gap-2 border-t border-line px-4 text-xs font-medium max-sm:hidden">
          <div className="flex items-center gap-2">
            <span>
              {selectedCommandKind === "link"
                ? "Open"
                : selectedCommandKind === "command"
                  ? "Run"
                  : "Navigate"}
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
