/**
 * Generates DiceBear Notionists avatar URLs from a seed string.
 * Each variant uses a different background to support the avatar lights system.
 */

const BASE = "https://api.dicebear.com/9.x/notionists/svg"
const SIZE = 200

function buildUrl(seed: string, backgroundColor?: string) {
  const params = new URLSearchParams({ seed, size: String(SIZE) })
  if (backgroundColor) params.set("backgroundColor", backgroundColor)
  return `${BASE}?${params.toString()}`
}

/** Stable hash from a string (djb2). */
function hash(str: string): number {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/**
 * Build the 4 avatar variants for the lights system.
 *
 * | Mode   | Lights | State        | Background |
 * |--------|--------|--------------|------------|
 * | Light  | Off    | Default      | transparent |
 * | Light  | On     | Highlight    | FFFAED (warm cream) |
 * | Dark   | Off    | Default      | 1C1C1E (dark gray) |
 * | Dark   | On     | Glow         | 2A2A2E (slightly lighter) |
 */
export function getAvatarVariants(username: string) {
  const h = hash(username)

  return {
    lightOff: buildUrl(`${h}-default`),
    lightOn: buildUrl(`${h}-warm`, "FFFAED"),
    darkOff: buildUrl(`${h}-dark`, "1C1C1E"),
    darkOn: buildUrl(`${h}-glow`, "2A2A2E"),
  }
}

/** Single avatar URL for use outside the lights system (e.g. OG image, favicon). */
export function getAvatarUrl(username: string) {
  return buildUrl(username)
}
