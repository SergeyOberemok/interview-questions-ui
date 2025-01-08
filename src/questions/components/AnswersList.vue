<script setup>
import Answer from './Answer.vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="wrapper">
    <h3 class="mb-1" v-if="answers.length > 0">Answers</h3>
    <span v-else>Answers are empty</span>

    <template v-for="(answer, index) in answers" :key="`${answer.title}_${index}`" class="mb-3">
      <answer :answer="answer"></answer>
    </template>
  </div>
</template>
