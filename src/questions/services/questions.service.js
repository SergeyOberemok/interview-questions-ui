import { applicationJsonHeader } from '@/core/constants'
import { identity, pickBy } from 'lodash-es'

const QUESTIONS_API = '/api/questions'

export class QuestionsService {
  constructor() {}

  async fetchQuestions(page, size, search) {
    try {
      const response = await fetch(
        `${QUESTIONS_API}?` +
          new URLSearchParams(
            pickBy(
              {
                page,
                size,
                search,
              },
              identity,
            ),
          ).toString(),
      )

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async postQuestion(question) {
    const options = {
      method: 'POST',
      headers: { ...applicationJsonHeader },
      body: JSON.stringify(question),
    }

    try {
      const response = await fetch(QUESTIONS_API, options)

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async removeQuestion(id) {
    const options = {
      method: 'DELETE',
      headers: { ...applicationJsonHeader },
    }

    try {
      const response = await fetch(`${QUESTIONS_API}/${id}`, options)

      return await response.json()
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
