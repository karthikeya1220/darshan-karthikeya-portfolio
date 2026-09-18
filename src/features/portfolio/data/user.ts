import type { User } from "@/features/portfolio/types/user"

export const USER: User = {
  firstName: "Darshan",
  lastName: "Karthikeya",
  displayName: "Darshan Karthikeya",
  username: "karthikeya1220",
  gender: "male",
  pronouns: "he/him",
  bio: "Building elegant solutions to complex problems.",
  flipSentences: [
    "Building elegant solutions to complex problems.",
    "Full Stack Developer & Applied AI Engineer.",
    "Open source contributor.",
    "IEEE Publication at TENCON 2026.",
  ],
  address: "India",
  phoneNumberB64: "", // E.164 format, base64 encoded (https://t.io.vn/base64-string-converter)
  emailB64: "ZGFyc2hhbmthcmViaGlrMDVAZ21haWwuY29t", // base64 encoded
  website: "https://darshan-karthikeya.vercel.app",
  jobTitle: "Full Stack Developer & Applied AI Engineer",
  jobs: [
    {
      title: "SDE Intern",
      company: "SRNR IT Solutions",
      website: "#",
      experienceId: "srnr-it-solutions",
    },
    {
      title: "SDE Intern / Data Intern",
      company: "QuantaGlobal",
      website: "#",
      experienceId: "quantaglobal",
    },
  ],
  about: `- I'm Darshan Karthikeya — a Full Stack Developer and Applied AI Engineer with production experience building MERN and Next.js platforms.
- Passionate about building AI-powered recruitment systems, wireframe-to-code generators, and real-time analytics dashboards.
- Currently pursuing B.Tech in Computer Science at IIITDM Kancheepuram (2022-2026). My experience spans scalable web systems, applied machine learning, and developer tooling.
- IEEE Publication — Research paper accepted at TENCON 2026: "Impact-Guided Slice Selection for Efficient Human-in-the-Loop Brain Tumor Segmentation" (NeuroSlice).
`,
  avatar: "https://avatars.githubusercontent.com/u/karthikeya1220",
  avatarSketch: "",
  avatarVariants: {
    lightOff: "https://avatars.githubusercontent.com/u/karthikeya1220",
    lightOn: "https://avatars.githubusercontent.com/u/karthikeya1220",
    darkOff: "https://avatars.githubusercontent.com/u/karthikeya1220",
    darkOn: "https://avatars.githubusercontent.com/u/karthikeya1220",
  },
  ogImage: "",
  namePronunciationUrl: "",
  timeZone: "Asia/Kolkata",
  keywords: [
    "darshan karthikeya",
    "karthikeya1220",
    "full stack developer",
    "applied ai engineer",
    "software engineer",
  ],
  dateCreated: "2024-01-01", // YYYY-MM-DD
}
