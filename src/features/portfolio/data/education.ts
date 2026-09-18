import type { Education } from "@/features/portfolio/types/education"

export const EDUCATION: Education[] = [
  {
    id: "iiitdm-kancheepuram",
    school: "IIITDM Kancheepuram",
    degree: "B.Tech",
    fieldOfStudy: "Computer Science",
    period: {
      start: "08.2022",
      end: "05.2026",
    },
    description: `- Currently pursuing B.Tech in Computer Science at IIITDM Kancheepuram.
- Focus areas: Full Stack Development, Applied AI, System Architecture.
- Lead Software Developer for official IIITDM Placement Portal.
- Technical Lead for IIITDM Web Team and Developers Club.
- Head Core (Tech Affairs) coordinating technical planning and mentoring developers.`,
    skills: [
      "TypeScript",
      "JavaScript",
      "Python",
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "System Design",
      "AI/ML",
    ],
  },
]
