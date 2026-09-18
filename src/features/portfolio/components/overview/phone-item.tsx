"use client"

import { useId } from "react"
import { decodePhoneNumber, formatPhoneNumber } from "@/utils/string"
import { PhoneIcon } from "lucide-react"

import { useIsClient } from "@/hooks/use-is-client"

import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item"
import { RevealEncodedTextScript } from "./reveal-encoded-text"

type PhoneItemProps = {
  phoneNumberB64: string
}

export function PhoneItem({ phoneNumberB64 }: PhoneItemProps) {
  const id = useId()
  const isClient = useIsClient()
  const phoneNumberDecoded = decodePhoneNumber(phoneNumberB64)
  const phoneNumberFormatted = formatPhoneNumber(phoneNumberDecoded)

  return (
    <IntroItem className="group">
      <IntroItemIcon>
        <PhoneIcon />
      </IntroItemIcon>

      <IntroItemContent className="flex">
        <IntroItemLink
          id={id}
          href={isClient ? `tel:${phoneNumberDecoded}` : ""}
          suppressHydrationWarning
        >
          {isClient ? phoneNumberFormatted : ""}
        </IntroItemLink>
      </IntroItemContent>

      <RevealEncodedTextScript id={id} textB64={btoa(phoneNumberFormatted)} />
    </IntroItem>
  )
}
