import { Label, LabelFactory } from '@/features/labels/shared'
import { faker } from '@faker-js/faker'
import { uniq } from 'lodash-es'
import { Answer, AnswerFactory } from '../../answers/models/answer.model'

export class Question {
  constructor(params) {
    this.assign(params)
  }

  assign({ id = '', definition = '', answers = [], labels = [], notes = '', image = '' } = {}) {
    this.id = id
    this.definition = definition
    this.answers = answers.map((answer) => new Answer(answer))
    this.labels = labels.map((label) => new Label(label))
    this.notes = notes
    this.image = image
  }
}

export class QuestionFactory {
  static create() {
    const id = faker.database.mongodbObjectId()
    const definition = faker.company.catchPhrase()
    const answers = Array.from(Array(2), () => AnswerFactory.create())
    const labels = uniq(Array.from(Array(3), () => LabelFactory.create()))
    const notes = faker.lorem.words()
    const image = faker.image.dataUri({ type: 'svg-base64' })

    return new Question({ id, definition, answers, labels, notes, image })
  }

  static createMany(count) {
    return Array.from(Array(count), () => this.create())
  }
}
