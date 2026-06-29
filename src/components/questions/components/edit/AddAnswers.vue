<script setup>
import { ref } from 'vue'
import AddAnswer from './AddAnswer.vue'
import EditableAnswersList from './EditableAnswersList.vue'
import UpdateAnswer from './UpdateAnswer.vue'
import { Answer } from '@/components/questions/models/answer.model.js'

const answers = defineModel({ type: Array, default: [] })

const selectedAnswer = ref()

function pushAnswer(answer) {
  answers.value = [...answers.value, answer]
}

function selectAnswer(answer) {
  selectedAnswer.value = answer
}

function updateUnswers(answer) {
  const index = answers.value.findIndex((item) => item === selectedAnswer.value)
  const newAnswers = [...answers.value]

  newAnswers.splice(index, 1, new Answer(answer))

  answers.value = newAnswers
  reset()
}

function reset() {
  selectedAnswer.value = null
}
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <editable-answers-list v-model="answers" @selected="selectAnswer"></editable-answers-list>

    <template v-if="!selectedAnswer">
      <add-answer @added="pushAnswer"></add-answer>
    </template>
    <template v-else>
      <update-answer
        :answer="selectedAnswer"
        @updated="updateUnswers"
        @cancelled="reset"
      ></update-answer>
    </template>
  </div>
</template>
