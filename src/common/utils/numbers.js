import { sample, shuffle } from 'lodash-es'

export function generateRangeNear(number, length = 4, allowNegative = false) {
  number = number ? number : 0
  let arr = Array.from(Array(length + 1), (v, i) => number + i + 1)
  let middle = Math.round((length + 1) / 2)

  if (number - middle < 0 && !allowNegative) {
    const difference = Math.abs(number - middle) - 1
    middle -= difference
  }

  return arr.map((i) => i - middle)
}

function generateRandomNear(correctOne) {
  return sample(generateRangeNear(correctOne).filter((i) => i != correctOne))
}

export function generateChoices(correctOne, length = 2) {
  const choices = Array.from(Array(length - 1), () => generateRandomNear(correctOne))

  return shuffle([correctOne, ...choices])
}

export function toDigits(number) {
  return `${number}`.split('').map((i) => +i)
}

export function splitByNumbers(expression) {
  if (!expression) {
    return []
  }

  return expression
    .split(/(\d+)/)
    .filter(Boolean)
    .map((i) => (isFinite(+i) ? +i : i))
}
