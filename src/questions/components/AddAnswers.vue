<script setup>
import AddAnswer from './AddAnswer.vue'
import EditableAnswersList from './EditableAnswersList.vue'

const answers = defineModel({ default: [] })

function pushAnswer(answer) {
  answers.value = [...answers.value, answer]
}
</script>

<template>
  <div class="wrapper grid grid-cols-2 gap-3">
    <editable-answers-list v-model="answers" class="w-full"></editable-answers-list>

    <add-answer @added="pushAnswer" class="w-full"></add-answer>
  </div>
</template>
