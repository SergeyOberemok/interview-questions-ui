import { faker } from '@faker-js/faker'
import { AnswerFactory } from './answer.model'
import { uniq } from 'lodash-es'

export class Question {
  constructor({ id, description, answers, labels, notes }) {
    this.id = id
    this.description = description
    this.answers = answers
    this.labels = labels
    this.notes = notes
  }
}

export class QuestionFactory {
  static create() {
    const id = faker.database.mongodbObjectId()
    const description = faker.company.catchPhrase()
    const answers = Array.from(Array(2), () => AnswerFactory.create())
    const labels = uniq(Array.from(Array(3), () => faker.lorem.word()))
    const notes = faker.lorem.words()

    return new Question({ id, description, answers, labels, notes })
  }
}
