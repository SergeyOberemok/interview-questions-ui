export function splitIntoParts(value) {
  return value
    .replace(/[!,.;]/g, ' ')
    .replace(/\s+/g, ' ')
    .split(/\s/)
    .filter(Boolean)
}
