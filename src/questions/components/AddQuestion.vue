<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { QuestionsService } from '../services/questions.service'
import { Question } from '../shared'
import { useQuestionsStore } from '../stores'
import QuestionForm from './QuestionForm.vue'
import QuestionTypeahead from './QuestionTypeahead.vue'

const router = useRouter()
const question = ref(new Question())
const questionsStore = useQuestionsStore()
const questionsService = new QuestionsService()

async function addQuestion(question) {
  await postQuestion(question)
  router.push('/questions')
}

async function postQuestion(question) {
  try {
    const params = await questionsService.postQuestion(question)

    questionsStore.add(new Question(params))
  } catch (error) {
    console.error(error)
    questionsStore.$reset()
  }
}

function navigateHome() {
  router.push({ path: '/' })
}

function navigateEdit(question) {
  router.push({ name: `edit-question`, params: { id: question.id } })
}
</script>

<template>
  <div class="wrapper">
    <question-form v-model="question" @edited="addQuestion" @cancelled="navigateHome">
      <template v-slot="slotProps">
        <question-typeahead
          v-model="slotProps.question.description"
          @selected="navigateEdit"
        ></question-typeahead>
      </template>
    </question-form>
  </div>
</template>
