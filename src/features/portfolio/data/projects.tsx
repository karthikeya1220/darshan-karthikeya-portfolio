import type { Project } from "../types/projects"

export const PROJECTS: Project[] = [
  {
    id: "hirenexa",
    title: "HireNexa",
    period: {
      start: "01.2025",
      end: "09.2025",
    },
    link: "https://github.com/karthikeya1220/HireNexa",
    skills: [
      "Full Stack",
      "Applied AI",
      "Next.js",
      "Gemini AI",
      "MERN Stack",
      "ATS",
    ],
    description: `Gemini-powered ATS for end-to-end recruitment automation. Reduced manual screening by 65%.
- Built AI resume screening system using Gemini AI
- Automated candidate matching and ranking
- Integrated with existing recruitment workflows`,
    metrics: [{ value: "65%", label: "less manual screening" }],
    isExpanded: true,
  },
  {
    id: "ui-flow",
    title: "UI Flow",
    period: {
      start: "06.2025",
    },
    link: "https://github.com/karthikeya1220/UI-Flow",
    skills: [
      "AI Developer Tooling",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Wireframe-to-Code",
    ],
    description: `AI platform converting wireframes into production-ready React + Tailwind code. 70% faster UI dev.
- Automated wireframe-to-code conversion
- Generated production-ready React components`,
    metrics: [{ value: "70%", label: "faster UI dev" }],
  },
  {
    id: "marketglimpse",
    title: "MarketGlimpse",
    period: {
      start: "03.2025",
    },
    link: "https://github.com/karthikeya1220/MarketGlimpse",
    skills: [
      "FinTech",
      "Next.js",
      "Real-time Analytics",
      "Gemini AI",
      "Stock Market",
    ],
    description: `Real-time stock analytics dashboard with Gemini-powered market insights and forecasting.
- Built real-time stock data visualization
- Integrated AI-powered market analysis`,
  },
  {
    id: "getit",
    title: "GetIt",
    period: {
      start: "08.2024",
    },
    link: "https://github.com/karthikeya1220/GetIt",
    skills: [
      "Marketplace",
      "React",
      "AI Skill Matching",
      "Razorpay",
      "Full Stack",
    ],
    description: `Student freelancing platform with AI skill matching and integrated Razorpay payments.
- Built AI-powered skill matching system
- Integrated Razorpay payment gateway`,
  },
  {
    id: "healyou",
    title: "HealYou",
    period: {
      start: "06.2025",
    },
    link: "https://github.com/karthikeya1220/HealYou",
    skills: [
      "React Native",
      "Expo",
      "TypeScript",
      "Expo Router",
      "Cross-platform",
    ],
    description: `Social fitness and wellness app combining community features with personal health tracking, shipped to iOS, Android, and web from a single Expo codebase.
- Built activity, workout, and progress dashboards with interactive charts
- Added community groups, real-time messaging, and smart notification preferences`,
    metrics: [{ value: "3", label: "platforms shipped" }],
  },
  {
    id: "next-role",
    title: "NextRole",
    period: {
      start: "08.2026",
    },
    link: "https://github.com/karthikeya1220/next-role",
    skills: ["Python", "FastAPI", "Next.js", "Semantic Search", "Ollama"],
    description: `Local-first AI career assistant that finds jobs across 90+ company boards, scores them with an explainable formula, and writes resumes grounded strictly in your own experience — no API keys, no data leaving your machine.
- Reads Greenhouse, Lever, Ashby, and SmartRecruiters boards with region and seniority filters that explain every exclusion
- RAG resume generation rejects any bullet or metric it cannot trace back to your knowledge base`,
    metrics: [
      { value: "90+", label: "job boards" },
      { value: "5", label: "scoring features" },
      { value: "0", label: "API keys" },
    ],
  },
]
