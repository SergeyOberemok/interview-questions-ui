<script setup>
const props = defineProps({
  questions: {
    type: Array,
    required: true
  }
})

const questions = props.questions
</script>

<template>
  <div class="wrapper">
    <div v-for="question in questions" :key="question.id">{{ question.description }}</div>
  </div>
</template>
