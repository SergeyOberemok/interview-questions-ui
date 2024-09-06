export function splitIntoParts(value) {
  return value.replace(/\W/g, ' ').replace(/\s+/g, ' ').split(/\s/).filter(Boolean)
}
