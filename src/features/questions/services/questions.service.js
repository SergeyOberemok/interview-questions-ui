import { PAGINATION } from '@/common/constants'
import { QuestionsRepository } from '@/features/questions/repositories/questions.repository'
import { usePageStore } from '@/stores/questions-paging.store'
import { useSearchStore } from '@/stores/questions-searching.store'
import { useQuestionsStore } from '@/stores/questions.store'

export class QuestionsService {
  constructor() {
    this.questionsRepository = new QuestionsRepository()
    this.questionsStore = useQuestionsStore()
    this.pageStore = usePageStore()
    this.searchStore = useSearchStore()
  }

  async fetchQuestions() {
    try {
      const { questions, total } = await this.questionsRepository.fetchQuestions(
        this.pageStore.page,
        PAGINATION.perPage,
        this.searchStore.search,
      )

      this.questionsStore.addQuestions(questions)
      this.questionsStore.setTotalCount(total)

      return { questions, total }
    } catch (error) {
      this.questionsStore.$reset()
    }
  }

  async createQuestion(question) {
    await this.questionsRepository.postQuestion(question)
    this.questionsStore.incrementQuestions()
    this.pageStore.$reset()
    this.searchStore.$reset()
  }

  async updateQuestion(question) {
    await this.questionsRepository.putQuestion(question)

    this.questionsStore.update(question)
  }

  async removeQuestion(id) {
    await this.questionsRepository.deleteQuestion(id)

    this.questionsStore.remove(id)
    this.questionsStore.decrementQuestions()
  }
}
