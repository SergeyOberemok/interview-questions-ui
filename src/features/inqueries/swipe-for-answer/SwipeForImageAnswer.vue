<script setup>
import ExpressionImage from '@/common/components/number-image/ExpressionImage.vue'
import NumberImage from '@/common/components/number-image/NumberImage.vue'
import SwipeForAnswer from './SwipeForAnswer.vue'

const { question, goal, isHighlighted, isCorrectChosen, isImagesStripped } = defineProps({
  question: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
    default: 0,
  },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
  isImagesStripped: Boolean,
})
const emit = defineEmits(['answered'])
</script>

<template>
  <div>
    <swipe-for-answer
      :question="question"
      :goal="goal"
      :is-highlighted="isHighlighted"
      :is-correct-chosen="isCorrectChosen"
      @answered="emit('answered', $event)"
    >
      <template v-slot:probable-answer="slotProps">
        <number-image :number="slotProps.number" :is-revealed="isImagesStripped"></number-image>
      </template>
      <template v-slot:swipe-expression="slotProps">
        <expression-image
          :expression="slotProps.expression"
          :is-revealed="isImagesStripped"
          :class="{ 'absolute inset-0': isImagesStripped }"
        ></expression-image>
      </template>
    </swipe-for-answer>
  </div>
</template>
