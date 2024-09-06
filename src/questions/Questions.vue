<script setup>
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import Search from '@/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'
import { usePageStore, useQuestionsStore, useSearchStore } from './stores'

const loading = ref(false)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()
const questionsStore = useQuestionsStore()

onMounted(async () => fetchQuestions())

async function fetchQuestions() {
  if (questionsStore.isLoaded) {
    return
  }

  loading.value = true

  try {
    const response = await fetch(
      '/api/questions?' +
        new URLSearchParams({
          page: pageStore.page,
          size: PAGINATION.perPage,
          search: searchStore.search,
        }).toString(),
    )
    const { questions, total } = await response.json()

    questionsStore.setQuestions(questions.map((question) => new Question(question)))
    questionsStore.setTotalCount(total)
  } catch (error) {
    console.error(error)
    questionsStore.$reset()
  } finally {
    loading.value = false
  }
}

pageStore.$subscribe(() => (questionsStore.$reset(), fetchQuestions()))
searchStore.$subscribe(() => (questionsStore.$reset(), pageStore.$reset(), fetchQuestions()))

function updateSearch(newSearch) {
  searchStore.set(newSearch)
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-3 text-xl">Questions</h1>

    <div v-if="loading">Loading...</div>

    <search @changed="updateSearch" class="mb-3"></search>

    <questions-list
      :questions="questionsStore.questions"
      :total="questionsStore.totalCount"
      v-model="page"
      class="mb-3"
    ></questions-list>
  </div>
</template>
