<script setup>
import QuestionItem from './QuestionItem.vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="wrapper">
    <div v-if="!questions.length">Empty</div>

    <div v-for="question in questions" :key="question.id">
      <QuestionItem :question="question" class="mb-3" />
    </div>
  </div>
</template>
