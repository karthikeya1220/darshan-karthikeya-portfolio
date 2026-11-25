import { cn } from "@/lib/utils"

// Kept under the IntroItem* slot naming; the tile itself is shared site-wide.
export { IconTile as IntroItemIcon } from "@/components/ui/icon-tile"

export function IntroItem({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-3 sm:gap-4 font-mono text-xs sm:text-sm",
        className
      )}
      {...props}
    />
  )
}

export function IntroItemContent({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-balance min-w-0 wrap-break-word", className)} {...props} />
  )
}

export function IntroItemLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      className={cn("link min-w-0 break-all sm:break-normal", className)}
      target="_blank"
      rel="noopener"
      {...props}
    />
  )
}
