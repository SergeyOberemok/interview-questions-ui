import { faker } from '@faker-js/faker'

export class Label {
  constructor(params) {
    this.assign(params)
  }

  assign({ id = '', name = '' } = {}) {
    this.id = id
    this.name = name
  }
}

export class LabelFactory {
  static create() {
    const id = faker.database.mongodbObjectId()
    const name = faker.lorem.word()

    return new Label({ id, name })
  }
}
