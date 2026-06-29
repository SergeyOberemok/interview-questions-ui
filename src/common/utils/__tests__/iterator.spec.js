import { describe, expect, it } from 'vitest'

import { makeIterator } from '../iterator'

describe('Iterator', () => {
  it('destruction', () => {
    const arr = Array.from(Array(3), (_, i) => i + 1)
    const iterator = makeIterator(arr)

    const result = [...iterator]

    expect(result).toEqual(arr)
  })
})
