<script setup>
import { generateChoices } from '@/common/utils/numbers'
import SwipeForImageAnswer from '@/features/questions/components/inqueries/SwipeForImageAnswer.vue'
import { ref } from 'vue'

const isImagesStripped = ref(false)
const question = ref({
  data: [2, 2],
  type: 'calculation',
  operation: '+',
})
const goal = ref(4)
</script>

<template>
  <div class="container mx-auto">
    <swipe-for-image-answer
      :question="question.data.join(` ${question.operation} `)"
      :choices="generateChoices(goal)"
      :is-images-stripped="isImagesStripped"
    ></swipe-for-image-answer>
  </div>
</template>
