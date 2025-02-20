import { hashCode } from '@/core/utils'
import { faker } from '@faker-js/faker'

export class Answer {
  constructor(params) {
    this.assign(params)
  }

  assign({ id = '', title = '', answer = '', type = '', note = '' } = {}) {
    this.id = id
    this.title = title
    this.answer = answer
    this.type = type
    this.note = note
  }

  hash() {
    return Object.values(this).map(hashCode).join('')
  }
}

export class AnswerFactory {
  static create() {
    const title = faker.person.jobTitle()
    const answer = faker.lorem.sentence()
    const type = 'text'
    const note = faker.lorem.words()

    return new Answer({ title, answer, type, note })
  }
}
