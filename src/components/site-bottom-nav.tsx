import dynamic from "next/dynamic"

import { MOBILE_NAV } from "@/config/site"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

const CommandMenu = dynamic(() => import("@/components/command-menu"))
const NavMobile = dynamic(() => import("@/components/nav-mobile"))

export function SiteBottomNav() {
  return (
    <div
      className={cn(
        "fixed! bottom-[calc(--spacing(2)+env(safe-area-inset-bottom,0))] left-1/2 z-50 flex w-fit -translate-x-1/2 items-center rounded-xl bg-popover/95 py-1 pr-1.5 pl-3 shadow-lg ring ring-foreground/10 backdrop-blur-md sm:hidden dark:ring-foreground/20",
        "*:data-[slot=command-menu-trigger]:gap-2 *:data-[slot=command-menu-trigger]:rounded-none *:data-[slot=command-menu-trigger]:border-none *:data-[slot=command-menu-trigger]:bg-transparent *:data-[slot=command-menu-trigger]:px-1 *:data-[slot=command-menu-trigger]:hover:bg-transparent *:data-[slot=command-menu-trigger]:active:scale-none *:data-[slot=command-menu-trigger]:touch-manipulation"
      )}
    >
      <CommandMenu />
      <Separator
        orientation="vertical"
        className="mx-1.5 data-vertical:h-5 data-vertical:self-center"
      />
      <NavMobile items={MOBILE_NAV} />
    </div>
  )
}
