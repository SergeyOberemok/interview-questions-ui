<script setup>
import AddAnswer from './AddAnswer.vue'
import AnswersList from './AnswersList.vue'

const answers = defineModel({ default: [] })

function updateAnswers(answer) {
  answers.value = [...answers.value, answer]
}
</script>

<template>
  <div class="wrapper grid grid-cols-2 gap-3">
    <answers-list :answers="answers" class="w-full"></answers-list>

    <add-answer @added="updateAnswers" class="w-full"></add-answer>
  </div>
</template>
