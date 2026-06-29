<script setup>
import { Question } from '@/features/questions/models/question.model'
import { QuestionsService } from '@/features/questions/services/questions.service.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import QuestionTypeahead from '../QuestionTypeahead.vue'
import QuestionForm from './QuestionForm.vue'

const router = useRouter()
const question = ref(new Question())
const questionsService = new QuestionsService()

async function addQuestion(question) {
  await questionsService.createQuestion(question)
  router.push('/questions')
}

function navigateHome() {
  router.push({ path: '/' })
}

function navigateEdit(question) {
  router.push({ name: `edit-question`, params: { id: question.id } })
}
</script>

<template>
  <div>
    <question-form v-model="question" @edited="addQuestion" @cancelled="navigateHome">
      <template v-slot="slotProps">
        <question-typeahead
          v-model="slotProps.question.definition"
          @selected="navigateEdit"
        ></question-typeahead>
      </template>
    </question-form>
  </div>
</template>
