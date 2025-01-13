<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { Question } from '../shared'
import { useQuestionsStore } from '../stores'
import QuestionForm from './QuestionForm.vue'

const router = useRouter()
const question = ref(new Question())
const questionsStore = useQuestionsStore()

async function addQuestion(question) {
  await postQuestion(question)
  router.push('/questions')
}

async function postQuestion(question) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  }

  try {
    const response = await fetch('/api/questions', options)
    const data = await response.json()

    questionsStore.add(new Question(data))
  } catch (error) {
    console.error(error)
    questionsStore.$reset()
  }
}

function navigateHome() {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="wrapper">
    <question-form
      v-model="question"
      @edited="addQuestion"
      @cancelled="navigateHome"
    ></question-form>
  </div>
</template>
