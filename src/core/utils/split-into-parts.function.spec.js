import { faker } from '@faker-js/faker'
import { assert, describe, expect, it } from 'vitest'

import { splitIntoParts } from './split-into-parts.function'

describe('splitIntoParts', () => {
  it('word', () => {
    const word = faker.lorem.word()

    const result = splitIntoParts(word)

    assert.isArray(result)
    expect(result).toContain(word)
  })

  it('sentences', () => {
    const sentence = faker.lorem.sentence()

    const result = splitIntoParts(sentence.replaceAll(' ', ' ;,'))

    assert.isArray(result)
    expect(result.length).toBeGreaterThan(0)
    expect(result).not.toContain(';')
  })
})
