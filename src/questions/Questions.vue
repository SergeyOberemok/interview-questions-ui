<script setup>
import { onMounted, ref, shallowRef } from 'vue'
import AddQuestion from './components/AddQuestion.vue'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'

const loading = ref(false)
const questions = shallowRef([])

onMounted(async () => fetchQuestions())

async function fetchQuestions() {
  loading.value = true

  try {
    const response = await fetch('/api/questions')
    const data = await response.json()

    questions.value = data.map((question) => new Question(question))
  } catch (error) {
    console.error(error)
    questions.value = []
  } finally {
    loading.value = false
  }
}

async function refreshQuestions() {
  fetchQuestions()
}
</script>

<template>
  <div class="container mx-auto mb-3">
    <h1 class="mb-1 text-xl">Questions</h1>

    <div v-if="loading">Loading...</div>

    <QuestionsList :questions="questions" class="mb-3" />

    <AddQuestion @added="refreshQuestions" />
  </div>
</template>
