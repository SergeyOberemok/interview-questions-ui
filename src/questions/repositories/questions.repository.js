import { HttpRepository } from '@/core/repositories/http.repository'
import { Question } from '@/questions/shared'
import { identity, pickBy } from 'lodash-es'

const QUESTIONS_API = '/api/questions'

export class QuestionsRepository {
  constructor() {
    this.httpRepository = new HttpRepository(QUESTIONS_API)
  }

  async fetchQuestions(page, size, search) {
    const params = pickBy(
      {
        page,
        size,
        search,
      },
      identity,
    )

    const { questions, total } = await this.httpRepository.get(params)

    return { questions: questions.map((question) => new Question(question)), total }
  }

  async postQuestion(question) {
    const response = await this.httpRepository.post(question)

    return new Question(response)
  }

  async putQuestion(question) {
    await this.httpRepository.put(question.id, question)

    return new Question(question)
  }

  async deleteQuestion(id) {
    return await this.httpRepository.delete(id)
  }
}
