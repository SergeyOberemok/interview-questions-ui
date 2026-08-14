import { faker } from '@faker-js/faker'

export class Answer {
  constructor(params) {
    this.assign(params)
  }

  assign({ id = '', title = '', detail = '', type = '', note = '' } = {}) {
    this.id = id
    this.title = title
    this.detail = detail
    this.type = type
    this.note = note
  }
}

export class AnswerFactory {
  static create() {
    const id = faker.number.int({ max: 1000 })
    const title = faker.person.jobTitle()
    const detail = faker.lorem.sentence()
    const type = 'text'
    const note = faker.lorem.words()

    return new Answer({ id, title, detail, type, note })
  }

  static createMany(count) {
    return Array.from(Array(count), () => AnswerFactory.create())
  }
}
