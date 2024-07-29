<script setup>
import { onMounted, ref, shallowRef } from 'vue'
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
</script>

<template>
  <div class="container mx-auto">
    <h1>Questions</h1>

    <div v-if="loading">Loading...</div>

    <div v-if="questions.length"><QuestionsList :questions="questions" /></div>
  </div>
</template>
