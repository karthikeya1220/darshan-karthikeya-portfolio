export type OpenSourceContribution = {
  id: string
  project: string
  summary: string
  tags: string[]
  highlights: string[]
  links: { label: string; href: string }[]
}

export type ContributionPrinciple = {
  id: string
  label: string
  description: string
}

export const OPEN_SOURCE_CONTRIBUTIONS: OpenSourceContribution[] = [
  {
    id: "avoid-ai-writing",
    project: "Avoid AI Writing",
    summary:
      "Contributed 10 merged pull requests to an open-source text detection project, focusing on making heuristic-based detection more reliable.",
    tags: ["NLP", "Heuristic Detection", "False-Positive Reduction", "Regression Testing"],
    highlights: [
      "Refined detection logic to handle edge cases and reduce false positives.",
      "Improved text normalization across Markdown and formatted content.",
      "Added regression coverage to protect existing behavior while fixing detection inconsistencies.",
      "Improved consistency and maintainability across related detection logic.",
    ],
    links: [
      {
        label: "My merged PRs →",
        href: "https://github.com/conorbronsdon/avoid-ai-writing/pulls?q=is:pr+is:merged+author:karthikeya1220",
      },
    ],
  },
  {
    id: "sentrysearch",
    project: "SentrySearch",
    summary:
      "Contributed improvements to a semantic search system, including a safe indexing preview and a retrieval evaluation workflow.",
    tags: ["Information Retrieval", "Embedding Infrastructure", "Evaluation Engineering"],
    highlights: [
      "Implemented a dry-run indexing preview with cost estimation, helping users inspect indexing impact before execution.",
      "Developed an evaluation workflow for a fixed 13-query benchmark using human relevance judgments.",
      "Implemented Precision@1, Precision@3, Precision@5, and Mean Reciprocal Rank (MRR) to measure retrieval quality.",
      "Extracted shared embedding and backend-resolution logic to reduce behavioral drift between indexing and evaluation.",
      "Added retry handling, cache identity validation, cleanup safeguards, and regression tests.",
    ],
    links: [
      {
        label: "My merged PRs →",
        href: "https://github.com/ssrajadh/sentrysearch/pulls?q=is:pr+is:merged+author:karthikeya1220",
      },
    ],
  },
]

export const CONTRIBUTION_PRINCIPLES: ContributionPrinciple[] = [
  {
    id: "correctness",
    label: "Correctness",
    description:
      "Investigate edge cases and fix underlying logic rather than hiding symptoms.",
  },
  {
    id: "reliability",
    label: "Reliability",
    description:
      "Build explicit failure handling, safe cleanup, and predictable retry behavior.",
  },
  {
    id: "testability",
    label: "Testability",
    description:
      "Use targeted regression tests to validate fixes and prevent regressions.",
  },
  {
    id: "maintainability",
    label: "Maintainability",
    description:
      "Extract reusable components and keep related implementations consistent.",
  },
  {
    id: "engineering-discipline",
    label: "Engineering discipline",
    description:
      "Validate changes with automated tests and packaging checks before publishing.",
  },
]
