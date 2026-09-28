import { getYear, parse } from "date-fns"

/**
 * Parses an employment period boundary ("MM.YYYY" or "YYYY") into a Date.
 * Year-only strings are clamped to the first or last month of that year.
 */
export function parsePeriodDate(
  str: string,
  fallbackMonth: "first" | "last"
): Date {
  if (str.includes(".")) {
    return parse(str, "MM.yyyy", new Date())
  }
  return parse(
    `${fallbackMonth === "last" ? "12" : "01"}.${str}`,
    "MM.yyyy",
    new Date()
  )
}

/**
 * Returns the year span covered by the periods ("2023 – 2025", or a single
 * year when all periods fall within it). Open ends count as the current year.
 */
export function getPeriodYearSpan(
  periods: { start: string; end?: string }[]
): string | null {
  if (periods.length === 0) {
    return null
  }

  let min = Infinity
  let max = -Infinity

  for (const period of periods) {
    const startYear = getYear(parsePeriodDate(period.start, "first"))
    const endYear = getYear(
      period.end ? parsePeriodDate(period.end, "last") : new Date()
    )
    min = Math.min(min, startYear)
    max = Math.max(max, endYear)
  }

  return min === max ? `${min}` : `${min} – ${max}`
}
