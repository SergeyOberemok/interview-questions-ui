<script setup>
import { QuestionsService } from '@/questions/services/questions.service'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Question } from '../shared'
import { useQuestionsStore } from '../stores'
import QuestionForm from './QuestionForm.vue'

const router = useRouter()
const route = useRoute()
const questionsStore = useQuestionsStore()
const question = ref(new Question())
const questionsService = new QuestionsService()

onMounted(() => (question.value = new Question(questionsStore.find(route.params.id))))

async function updateQuestion(question) {
  questionsService.updateQuestion(question)
  router.push('/questions')
}

function navigateHome() {
  router.push({ path: '/' })
}
</script>

<template>
  <div class="edit-question-wrapper">
    <question-form
      v-model="question"
      @edited="updateQuestion"
      @cancelled="navigateHome"
    ></question-form>
  </div>
</template>
