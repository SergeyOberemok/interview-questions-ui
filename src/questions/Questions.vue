<script setup>
import { PAGINATION } from '@/core/shared/constants'
import { onMounted, ref, shallowRef } from 'vue'
import AddQuestion from './components/AddQuestion.vue'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'

const loading = ref(false)
const questions = shallowRef([])
const totalQuestionsCount = ref(0)

onMounted(async () => fetchQuestions())

async function fetchQuestions(page = 1) {
  loading.value = true

  try {
    const response = await fetch(
      '/api/questions?' +
        new URLSearchParams({
          page,
          size: PAGINATION.perPage,
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

async function refreshQuestions(page) {
  fetchQuestions(page)
}
</script>

<template>
  <div class="container mx-auto mb-3">
    <h1 class="mb-1 text-xl">Questions</h1>

    <div v-if="loading">Loading...</div>

    <QuestionsList
      :questions="questions"
      :total="totalQuestionsCount"
      @page-changed="refreshQuestions"
      class="mb-3"
    />

    <AddQuestion @added="refreshQuestions" />
  </div>
</template>
