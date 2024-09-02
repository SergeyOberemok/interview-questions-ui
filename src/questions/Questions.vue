<script setup>
import Search from '@/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import { storeToRefs } from 'pinia'
import { onMounted, ref, shallowRef, watch } from 'vue'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'
import { usePageStore } from './stores/paging'
import { useSearchStore } from './stores/searching'

const loading = ref(false)
const questions = shallowRef([])
const totalQuestionsCount = ref(0)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()

onMounted(async () => fetchQuestions())

async function fetchQuestions() {
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
    const { questions: data, total } = await response.json()

    questions.value = data.map((question) => new Question(question))
    totalQuestionsCount.value = total
  } catch (error) {
    console.error(error)
    questions.value = []
  } finally {
    loading.value = false
  }
}

pageStore.$subscribe(fetchQuestions)

function updateSearchAndPaging(newSearch) {
  pageStore.$reset()
  searchStore.set(newSearch)
}
searchStore.$subscribe(fetchQuestions)
</script>

<template>
  <div class="container mx-auto mb-3">
    <h1 class="mb-1 text-xl">Questions</h1>

    <div v-if="loading">Loading...</div>

    <search @changed="updateSearchAndPaging" class="mb-3"></search>

    <questions-list
      :questions="questions"
      :total="totalQuestionsCount"
      v-model="page"
      class="mb-3"
    ></questions-list>
  </div>
</template>
