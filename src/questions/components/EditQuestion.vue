<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { Question } from '../shared'
import { useQuestionsStore } from '../stores'
import QuestionForm from './QuestionForm.vue'

const router = useRouter()
const route = useRoute()
const questionsStore = useQuestionsStore()
const question = ref(new Question())

onMounted(() => (question.value = questionsStore.find(route.params.id)))

async function updateQuestion(question) {
  await putQuestion(question)
  router.push('/questions')
}

async function putQuestion(question) {
  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  }

  try {
    const response = await fetch(`/api/questions/${question.id}`, options)
    const data = await response.json()

    questionsStore.update(new Question(data))
  } catch (error) {
    console.error(error)
    questionsStore.$reset()
  }
}
</script>

<template>
  <div class="wrapper">
    <question-form v-model="question" @edited="updateQuestion"></question-form>
  </div>
</template>
