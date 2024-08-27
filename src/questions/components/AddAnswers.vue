<script setup>
import AddAnswer from './AddAnswer.vue'
import AnswersList from './AnswersList.vue'

const answers = defineModel({ default: [] })

function updateAnswers(answer) {
  answers.value = [...answers.value, answer]
}
</script>

<template>
  <div class="wrapper">
    <answers-list :answers="answers"></answers-list>

    <add-answer @added="updateAnswers"></add-answer>
  </div>
</template>
