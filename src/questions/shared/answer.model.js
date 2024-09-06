import { faker } from '@faker-js/faker'

export class Answer {
  constructor(params) {
    this.assign(params)
  }

  assign({ title = '', answer = '', type = '' } = {}) {
    this.title = title
    this.answer = answer
    this.type = type
  }
}

export class AnswerFactory {
  static create() {
    const title = faker.person.jobTitle()
    const answer = faker.lorem.sentence()
    const type = 'text'

    return new Answer({ title, answer, type })
  }
}
