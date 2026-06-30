<script setup>
import { computed, useTemplateRef, watch } from 'vue'

import ExpressionImage from '@/common/components/ExpressionImage.vue'
import LeftRightSwipe from '@/common/components/LeftRightSwipe.vue'
import NumberImage from '@/common/components/NumberImage.vue'
import ProbableAnswer from './ProbableAnswer.vue'

const probableAnswerRef = useTemplateRef('probableAnswerRef')
const questionRef = useTemplateRef('questionRef')
const expression = computed(() => `${question} = ${goal}`)

const { question, goal, isHighlighted } = defineProps({
  question: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
    default: 0,
  },
  isImagesStripped: Boolean,
  isHighlighted: Boolean,
  isCorrect: Boolean,
})
const emit = defineEmits(['answered'])

function assessChoice(choice) {
  const choices = probableAnswerRef.value.choices
  const answer = (choice === 'right' ? choices.slice(-1) : choices)[0]

  emit('answered', answer)
}

function reset() {
  probableAnswerRef.value.reset()
  questionRef.value.reset()
}

watch(
  () => isHighlighted,
  (value) => !value && reset(),
)
</script>

<template>
  <div class="flex flex-col">
    <probable-answer
      :correct="goal"
      @chosen="emit('answered', $event)"
      class="mb-3"
      ref="probableAnswerRef"
      v-slot="slotProps"
    >
      <number-image
        :number="slotProps.number"
        :is-revealed="isImagesStripped"
        class="h-48 border border-gray-300 rounded-md shadow-sm bg-gray-50 flex justify-center items-center"
        :class="{
          'border-2 border-green-300 bg-green-50': isHighlighted && slotProps.number === goal,
          'border-2 border-red-300 bg-red-50':
            isHighlighted && !isCorrect && slotProps.number !== goal,
        }"
      ></number-image>
    </probable-answer>

    <div class="relative">
      <left-right-swipe
        @moved="assessChoice"
        class="h-64 border border-gray-300 rounded-md shadow-sm bg-gray-50"
        :class="{
          'bg-green-50 border-green-300': isHighlighted && isCorrect,
          'bg-red-50 border-red-300': isHighlighted && !isCorrect,
        }"
        ref="questionRef"
      >
        <expression-image :expression="question" :is-revealed="isImagesStripped"></expression-image>
      </left-right-swipe>

      <template v-if="isHighlighted">
        <expression-image
          :expression="expression"
          :is-revealed="isImagesStripped"
          class="absolute inset-0"
        ></expression-image>
      </template>
    </div>
  </div>
</template>
