import { shuffle } from 'lodash-es'

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

export function pickRandom(numbers) {
  const randomIndex = Math.floor(Math.random() * numbers.length)

  return numbers[randomIndex]
}

export function generateChoices(correctOne) {
  const random = pickRandom(generateRangeNear(correctOne).filter((i) => i != correctOne))

  return shuffle([correctOne, random])
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
