import {
  CodeXmlIcon,
  LightbulbIcon,
  BrainCircuitIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const PROFESSIONAL_EXPERIENCES: Experience[] = [
  {
    id: "srnr-it-solutions",
    companyName: "SRNR IT Solutions",
    companyWebsite: "#",
    location: "India",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "SDE Intern",
        employmentPeriod: {
          start: "09.2025",
          end: "02.2026",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `- Built and released mobile applications using React Native and TypeScript; shipped polished UI/UX across iOS and Android with strong attention to usability and product quality.
- Developed backend services and APIs using Node.js and Express.js; worked with PostgreSQL, Redis, REST APIs, and third-party integrations.
- Took features from concept through testing, deployment, and production support; maintained and improved products following launch; demonstrated strong ownership and adaptability.
- Used AI-assisted development workflows to improve productivity; experimented with AI evaluation and observability for debugging and tracing.`,
        skills: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs"],
        metrics: [
          { label: "Active users", value: "70+" },
        ],
      },
    ],
  },
  {
    id: "quantaglobal",
    companyName: "QuantaGlobal",
    companyWebsite: "#",
    location: "India",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "SDE Intern / Data Intern",
        employmentPeriod: {
          start: "01.2025",
          end: "09.2025",
        },
        employmentType: "Internship",
        icon: <CodeXmlIcon />,
        description: `- Built polished product experiences across web and mobile using React, React Native, TypeScript, and JavaScript; took features from early concepts through implementation, testing, deployment, and production.
- Developed supporting services and APIs using Node.js; worked with Supabase, PostgreSQL, REST APIs, and third-party integrations across multiple product initiatives.
- Used AI-assisted development workflows (GitHub Copilot, ChatGPT) to improve delivery speed and productivity; built AI-enabled product capabilities for internal tools.
- Made practical architecture and tooling decisions; brought structure and clarity to rapidly evolving products with incomplete requirements; managed multiple priorities with end-to-end ownership.`,
        skills: [
          "Next.js",
          "Node.js",
          "MongoDB",
          "REST APIs",
          "AI/ML",
          "Performance Optimization",
        ],
        metrics: [
          { label: "Manual screening reduced", value: "65%" },
          { label: "Daily API requests", value: "500+" },
          { label: "Latency improvement", value: "35%" },
        ],
      },
    ],
    isCurrentEmployer: false,
  },
  {
    id: "viswam-ai",
    companyName: "Viswam.ai",
    companyWebsite: "#",
    location: "India",
    locationType: "Remote",
    positions: [
      {
        id: "1",
        title: "AI Research Contributor",
        employmentPeriod: {
          start: "06.2025",
          end: "07.2025",
        },
        employmentType: "Internship",
        icon: <BrainCircuitIcon />,
        description: `- Built data processing pipelines using Python; supported backend services and integrations for LLM-powered product capabilities.`,
        skills: ["Python", "NLP", "LLM", "GenAI", "Data Processing"],
      },
    ],
  },
]

export const COLLEGE_EXPERIENCES: Experience[] = [
  {
    id: "placement-cell-iiitdm",
    companyName: "Placement Cell IIITDM",
    location: "Chennai, Tamil Nadu",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Lead Full Stack Developer",
        employmentPeriod: {
          start: "2024",
          end: "2025",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Designed, developed, and maintained the official placement portal serving 500+ students and 30+ recruiters
- Managed the complete software lifecycle from system architecture to deployment`,
        skills: ["Full Stack", "System Architecture", "Deployment"],
        metrics: [
          { label: "Students served", value: "500+" },
          { label: "Recruiters onboarded", value: "30+" },
        ],
      },
    ],
  },
  {
    id: "iiitdm-web-team",
    companyName: "IIITDM Web Team",
    location: "Chennai, Tamil Nadu",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Technical Lead",
        employmentPeriod: {
          start: "2023",
          end: "2025",
        },
        employmentType: "Part-time",
        icon: <CodeXmlIcon />,
        description: `- Led development initiatives for the CSE Department website and Developers Club platform
- Improved platform usability, maintainability, and backend performance`,
        skills: ["Web Development", "Leadership", "Team Management"],
      },
    ],
  },
  {
    id: "technical-affairs-iiitdm",
    companyName: "Technical Affairs IIITDM",
    location: "Chennai, Tamil Nadu",
    locationType: "On-site",
    positions: [
      {
        id: "1",
        title: "Head Core (Tech Affairs)",
        employmentPeriod: {
          start: "2023",
          end: "2025",
        },
        employmentType: "Part-time",
        icon: <LightbulbIcon />,
        description: `- Spearheaded technical operations and development teams
- Oversaw campus-wide digital infrastructure and orchestrated technical events
- Coordinated technical planning, code reviews, and mentored developers across institute platforms`,
        skills: ["Technical Leadership", "Mentoring", "Project Management"],
      },
    ],
  },
]
