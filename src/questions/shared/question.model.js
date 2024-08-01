export class Question {
  constructor({ id, description, answers, labels, notes }) {
    this.id = id
    this.description = description
    this.answers = answers
    this.labels = labels
    this.notes = notes
  }
}
