import type { Route } from "next"

import type { NavItem } from "@/types/nav"
import { SOCIAL } from "@/features/portfolio/data/social-links"
import { USER } from "@/features/portfolio/data/user"

export const SITE_INFO = {
  name: USER.displayName,
  url:
    process.env.NEXT_PUBLIC_APP_URL || "https://darshan-karthikeya.runs-on.dev",
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
}

export const LICENSE = {
  name: "MIT License",
  url: "https://github.com/karthikeya1220/darshan-karthikeya-portfolio/blob/main/LICENSE",
}

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
}

export const MAIN_NAV: NavItem<Route>[] = []

export const MOBILE_NAV: NavItem[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Overview",
    href: "/#overview",
  },
  {
    title: "About",
    href: "/#hello",
  },
  {
    title: "Tech Stack",
    href: "/#stack",
  },
  {
    title: "Experience",
    href: "/#professional-experience",
  },
  {
    title: "Education",
    href: "/#education",
  },
  {
    title: "Projects",
    href: "/#projects",
  },
  {
    title: "Open Source",
    href: "/#open-source",
  },
  {
    title: "Awards",
    href: "/#awards",
  },
  {
    title: "Testimonials",
    href: "/#testimonials",
  },
  {
    title: "Availability",
    href: "/#availability",
  },
  {
    title: "Get in touch",
    href: "/#contact",
  },
]

export const X_HANDLE = SOCIAL.github.handle
export const GITHUB_USERNAME = SOCIAL.github.handle
export const SOURCE_CODE_GITHUB_REPO =
  "karthikeya1220/darshan-karthikeya-portfolio"
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/karthikeya1220/darshan-karthikeya-portfolio"

export const SPONSORSHIP_URL = ""

export const UTM_PARAMS = {
  utm_source: "",
}
