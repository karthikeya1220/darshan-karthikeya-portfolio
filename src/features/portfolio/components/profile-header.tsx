import { USER } from "@/features/portfolio/data/user"
import { AvatarElectricEffect } from "./avatar-electric-effect"
import { AvatarLights } from "./avatar-lights"
import { AvatarLightsToggle } from "./avatar-lights-toggle"
import { FlipSentences } from "./flip-sentences"
import { VerifiedIcon } from "./verified-icon"

const avatarVariants = USER.avatarVariants

export function ProfileHeader() {
  return (
    <div className="screen-line-bottom grid grid-cols-[auto_1fr] grid-rows-[1fr_auto] overflow-y-clip border-x screen-line-bottom-border after:z-1">
      <div className="flex flex-col sm:row-span-2 sm:row-start-1">
        <div className="screen-line-top mt-auto shrink-0 border-r border-line">
          <div className="mx-0.5 my-0.75 flex outline-none">
            <AvatarElectricEffect>
              <div className="relative">
                <AvatarLights variants={avatarVariants} />
                <AvatarLightsToggle className="absolute inset-0 size-full cursor-pointer rounded-full" />
              </div>
            </AvatarElectricEffect>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="z-1 mt-auto border-t border-line">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-[2rem]/none font-medium tracking-tight">
              {USER.displayName}
            </h1>

            <VerifiedIcon className="size-4.5 select-none" aria-hidden />
          </div>

          <FlipSentences className="h-12.5 border-t border-line py-1 pl-4 sm:h-9">
            {USER.flipSentences}
          </FlipSentences>
        </div>
      </div>
    </div>
  )
}
