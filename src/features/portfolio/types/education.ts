export type Education = {
  id: string
  school: string
  degree?: string
  fieldOfStudy?: string
  period: {
    start: string
    end?: string
  }
  description?: string
  skills?: string[]
  /** Focus-area groups rendered as the curriculum map figure. */
  coursework?: { label: string; skills: string[] }[]
  /** Handwritten margin note shown beside the entry (lg+ only). */
  annotation?: string
  isExpanded?: boolean
}
