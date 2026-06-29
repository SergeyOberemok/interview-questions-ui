<script setup>
import Answer from './AnswerItem.vue';

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>
    <h3 class="mb-2" v-if="answers.length > 0">Answers</h3>
    <span v-else>Answers are empty</span>

    <template v-for="(answer, index) in answers" :key="`${answer.title}_${index}`">
      <answer :answer="answer" class="mb-2"></answer>
    </template>
  </div>
</template>
