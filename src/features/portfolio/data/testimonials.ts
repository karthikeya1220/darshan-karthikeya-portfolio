export type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  content: string
  relationship: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "colleague",
    role: "Software Engineer",
    company: "QuantaGlobal",
    content:
      "Darshan consistently delivered production-ready features ahead of schedule. His ability to architect full-stack solutions and optimize backend performance made a measurable impact on our platform.",
    relationship: "Worked together at QuantaGlobal",
  },
  {
    id: "2",
    name: "mentor",
    role: "Technical Lead",
    company: "IIITDM Web Team",
    content:
      "One of the most self-driven developers I've managed. Darshan took ownership of critical infrastructure and mentored junior developers while maintaining high code quality across multiple projects.",
    relationship: "Managed Darshan at IIITDM Web Team",
  },
]
