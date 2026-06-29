<script setup>
import LeftRightSwipe from '@/common/components/inqueries/left-right-swipe/LeftRightSwipe.vue'
import ProbableAnswer from '@/common/components/inqueries/probable-answer/ProbableAnswer.vue'
import { computed, useTemplateRef, watch } from 'vue'

const { question, goal, isHighlighted, isCorrectChosen } = defineProps({
  question: {
    type: String,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})
const emit = defineEmits(['answered'])

const probableAnswerRef = useTemplateRef('probableAnswerRef')
const questionRef = useTemplateRef('questionRef')
const expression = computed(() => `${question}` + (isHighlighted ? ` = ${goal}` : ``))
const choices = computed(() => probableAnswerRef.value.choices)

function assessChoice(choice) {
  const answer = (choice === 'right' ? choices.value.slice(-1) : choices.value)[0]

  probableAnswerRef.value.setChoice(answer)
  emit('answered', answer)
}

watch(
  () => isHighlighted,
  (value) => (value ? questionRef.value.reset() : probableAnswerRef.value.setChoice(null)),
)
</script>

<template>
  <div class="flex flex-col">
    <probable-answer
      ref="probableAnswerRef"
      :goal="goal"
      :is-highlighted="isHighlighted"
      :is-correct-chosen="isCorrectChosen"
      @chosen="emit('answered', $event)"
      class="mb-3"
      v-slot="slotProps"
    >
      <slot name="probable-answer" :number="slotProps.number"></slot>
    </probable-answer>

    <div class="relative">
      <left-right-swipe
        :is-highlighted="isHighlighted"
        :is-correct-chosen="isCorrectChosen"
        @moved="assessChoice"
        ref="questionRef"
      >
        <slot name="swipe-expression" :expression="question">{{ expression }}</slot>
      </left-right-swipe>
    </div>
  </div>
</template>
