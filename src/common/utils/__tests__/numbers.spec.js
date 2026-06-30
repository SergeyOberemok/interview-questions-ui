import { describe, expect, it } from 'vitest'

import {
  generateChoices,
  generateRangeNear,
  pickRandom,
  splitByNumbers,
  toDigits,
} from '../numbers'

describe('Numbers', () => {
  it('generateRangeNear', () => {
    const number = 6

    const result = generateRangeNear(number)

    expect(result).toBeTruthy()
    expect(result).toContain(number)
    expect(result.some((i) => i < 0)).toBeFalsy()
  })

  it('generateRangeNear with negatives', () => {
    const number = 1

    const result = generateRangeNear(number, 4, true)

    expect(result).toBeTruthy()
    expect(result).toContain(number)
    expect(result.some((i) => i < 0)).toBeTruthy()
  })

  it('pickRandom', () => {
    const length = 5
    const arr = Array.from(Array(length), (_, i) => i)

    const result = pickRandom(arr)

    expect(arr).toContain(result)
    expect(arr.indexOf(result)).toBeLessThanOrEqual(length)
  })

  it('generateChoices', () => {
    const correct = 5

    const result = generateChoices(correct)

    expect(result).toHaveLength(2)
    expect(result).toContain(correct)
  })

  it('toDigits', () => {
    const number = 12

    const result = toDigits(number)

    expect(result).toHaveLength(2)
    expect(result).toContain(1)
    expect(result).toContain(2)
  })

  it('splitByNumbers', () => {
    const expression = '2 x 2 = 5'

    const result = splitByNumbers(expression)

    expect(result).toBeTruthy()
    expect(result).toHaveLength(5)
    expect(result).toContain(2)
    expect(result).toContain(5)
  })
})
