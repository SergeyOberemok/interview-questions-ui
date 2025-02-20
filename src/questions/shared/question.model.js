import { Label, LabelFactory } from '@/labels/shared'
import { faker } from '@faker-js/faker'
import { uniq } from 'lodash-es'
import { Answer, AnswerFactory } from './answer.model'

export class Question {
  constructor(params) {
    this.assign(params)
  }

  assign({ id = '', description = '', answers = [], labels = [], notes = '', image = '' } = {}) {
    this.id = id
    this.description = description
    this.answers = answers.map((answer) => new Answer(answer))
    this.labels = labels.map((label) => new Label(label))
    this.notes = notes
    this.image = image
  }

  reset() {
    this.assign()
  }
}

export class QuestionFactory {
  static create() {
    const id = faker.database.mongodbObjectId()
    const description = faker.company.catchPhrase()
    const answers = Array.from(Array(2), () => AnswerFactory.create())
    const labels = uniq(Array.from(Array(3), () => LabelFactory.create()))
    const notes = faker.lorem.words()
    const image = faker.image.dataUri({ type: 'svg-base64' })

    return new Question({ id, description, answers, labels, notes, image })
  }
}
