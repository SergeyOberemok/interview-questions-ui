<script setup>
import InqueryFactory from './InqueryFactory.vue'

const { question, args } = defineProps({
  question: {
    type: Object,
    required: true,
  },
  args: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['answered'])
</script>

<template>
  <inquery-factory
    :type="question.type"
    :args="{ ...question, ...args, onAnswered: (answer) => emit('answered', answer) }"
  ></inquery-factory>
</template>
