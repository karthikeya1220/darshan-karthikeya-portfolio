import {
  CodeXmlIcon,
  LightbulbIcon,
  BrainCircuitIcon,
} from "lucide-react"

import type { Experience } from "@/features/portfolio/types/experiences"

export const EXPERIENCES: Experience[] = [
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
        description: `- Built Accounting and HRMS systems on MERN stack
- Designed REST APIs and CRUD workflows
- Handled concurrent requests for 70+ active users`,
        skills: ["React", "Node.js", "MongoDB", "Express.js", "REST APIs"],
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
        description: `- Built SAP monitoring platform tracking 300+ KPIs via REST APIs
- Developed HireNexa AI resume screening system reducing manual review by 65%
- Optimized backend latency by 35% using indexing, caching, and concurrent request handling
- Supported 500+ daily production API requests
- Delivered Health & Fitness App with live vitals dashboards
- Designed modular frontend components improving UX and maintainability`,
        skills: [
          "Next.js",
          "Node.js",
          "MongoDB",
          "REST APIs",
          "AI/ML",
          "Performance Optimization",
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
        description: `- Worked on Telugu Large Language Model datasets
- Built preprocessing pipelines for low-resource NLP
- Contributed to GenAI proof-of-concepts
- Supported experimentation and evaluation workflows`,
        skills: ["Python", "NLP", "LLM", "GenAI", "Data Processing"],
      },
    ],
  },
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
