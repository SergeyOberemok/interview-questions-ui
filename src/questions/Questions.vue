<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '@/core/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import QuestionsList from './components/QuestionsList.vue'
import { QuestionsService } from './services/questions.service'
import { Question } from './shared/question.model'
import { usePageStore, useQuestionsStore, useSearchStore } from './stores'

const isLoading = ref(false)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()
const { search } = storeToRefs(searchStore)
const questionsStore = useQuestionsStore()
const router = useRouter()
const questionsService = new QuestionsService()

onMounted(async () => fetchQuestions())
pageStore.$subscribe(() => (questionsStore.$reset(), fetchQuestions()))

async function fetchQuestions() {
  if (questionsStore.isLoaded) {
    return
  }

  isLoading.value = true

  try {
    const { questions, total } = await questionsService.fetchQuestions(
      page.value,
      PAGINATION.perPage,
      search.value,
    )

    questionsStore.addQuestions(questions.map((question) => new Question(question)))
    questionsStore.setTotalCount(total)
  } catch (error) {
    questionsStore.$reset()
  } finally {
    isLoading.value = false
  }
}

async function removeQuestion(id) {
  try {
    const quantity = await questionsService.removeQuestion(id)

    questionsStore.remove(id)
    questionsStore.setTotalCount(questionsStore.totalCount - quantity)
  } catch (error) {}
}

function updateSearch() {
  questionsStore.$reset(), pageStore.$reset(), fetchQuestions()
}

function navigateToEditQuestion(id) {
  router.push({ name: 'edit-question', params: { id } })
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-3 text-xl">Questions</h1>

    <search v-model="search" :is-loading="isLoading" @changed="updateSearch" class="mb-3"></search>

    <questions-list
      :questions="questionsStore.questions"
      :total="questionsStore.totalCount"
      v-model="page"
      class="mb-3"
      @on-edit="navigateToEditQuestion"
      @on-delete="removeQuestion"
    ></questions-list>

    <div v-if="isLoading">Loading...</div>
  </div>
</template>
