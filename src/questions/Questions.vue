<script setup>
import Search from '@/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import { onMounted, ref, shallowRef } from 'vue'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'

const loading = ref(false)
const questions = shallowRef([])
const totalQuestionsCount = ref(0)
const search = ref('')
const page = ref(1)

onMounted(async () => fetchQuestions())

async function fetchQuestions() {
  loading.value = true

  try {
    const response = await fetch(
      '/api/questions?' +
        new URLSearchParams({
          page: page.value,
          size: PAGINATION.perPage,
          search: search.value,
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
</script>

<template>
  <div class="container mx-auto mb-3">
    <h1 class="mb-1 text-xl">Questions</h1>

    <div v-if="loading">Loading...</div>

    <search v-model="search" @changed="fetchQuestions" class="mb-3"></search>

    <questions-list
      :questions="questions"
      :total="totalQuestionsCount"
      v-model="page"
      @page-changed="fetchQuestions"
      class="mb-3"
    ></questions-list>
  </div>
</template>
