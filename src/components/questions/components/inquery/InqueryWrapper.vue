<script setup>
import QuestionPrompt from './QuestionPrompt'

const { question } = defineProps({
  question: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <question-prompt
      :question="question"
      :is-images-stripped="isStripped"
      :is-highlighted="isHighlighted"
      :is-correct="isCorrect"
      @answered="(answer) => assess(answer).then(() => stepperRef.next())"
    ></question-prompt>
  </div>
</template>
