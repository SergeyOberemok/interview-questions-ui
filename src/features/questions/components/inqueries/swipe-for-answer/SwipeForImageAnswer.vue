<script setup>
import ExpressionImage from '@/common/components/ExpressionImage.vue'
import NumberImage from '@/common/components/NumberImage.vue'
import SwipeForAnswer from './SwipeForAnswer.vue'

const { question, choices, isImagesStripped } = defineProps({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: true,
  },
  isImagesStripped: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <swipe-for-answer :question="question" :choices="choices">
      <template v-slot:probable-answer="slotProps">
        <number-image
          :number="slotProps.number"
          :is-revealed="isImagesStripped"
          class="h-48 flex justify-center items-center"
        ></number-image>
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
