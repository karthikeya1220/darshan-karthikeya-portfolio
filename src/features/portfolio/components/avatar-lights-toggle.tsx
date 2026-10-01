"use client"

import React from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { useClickSound } from "@/hooks/soundcn/use-click-sound"
import { useAvatarLights } from "@/hooks/use-avatar-lights"

export function AvatarLightsToggle(
  props: Omit<React.ComponentProps<"button">, "onClick">
) {
  const { toggleLights } = useAvatarLights()

  const [click] = useClickSound()

  const handleToggle = () => {
    click()
    toggleLights()
  }

  useHotkeys("l", handleToggle)

  return (
    <button
      aria-label="Toggle Avatar Lights"
      onClick={handleToggle}
      {...props}
    />
  )
}
