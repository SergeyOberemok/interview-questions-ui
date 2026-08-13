<script setup>
import LeftRightSwipe from '@/common/components/inqueries/LeftRightSwipe.vue'
import ProbableAnswer from '@/common/components/inqueries/ProbableAnswer.vue'
import { computed, useTemplateRef, watch } from 'vue'

const probableAnswerRef = useTemplateRef('probableAnswerRef')
const questionRef = useTemplateRef('questionRef')
const goal = computed(() => (isCorrectChosen ? choices.slice(-1) : choices[0]))
const expression = computed(() => `${question}` + (isHighlighted ? ` = ${goal.value}` : ``))

const { question, choices, isHighlighted, isCorrectChosen } = defineProps({
  question: {
    type: String,
    required: true,
  },
  choices: {
    type: Array,
    required: true,
    default: () => [],
  },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})
const emit = defineEmits(['answered'])

function assessChoice(choice) {
  const answer = (choice === 'right' ? choices.slice(-1) : choices)[0]

  probableAnswerRef.value.setChoice(answer)
  emit('answered', answer)
}

function reset() {
  questionRef.value.reset()
  probableAnswerRef.value.setChoice(null)
}

watch(
  () => isHighlighted,
  (value) => !value && reset(),
)
</script>

<template>
  <div class="flex flex-col">
    <probable-answer
      ref="probableAnswerRef"
      :choices="choices"
      :is-highlighted="isHighlighted"
      :is-correct-chosen="isCorrectChosen"
      @chosen="emit('answered', $event)"
      class="mb-3"
      v-slot="slotProps"
    >
      <slot :number="slotProps.number"></slot>
      <!-- <number-image
        :number="slotProps.number"
        :is-revealed="isImagesStripped"
        class="h-48 flex justify-center items-center"
      ></number-image> -->
    </probable-answer>

    <div class="relative">
      <left-right-swipe
        :is-highlighted="isHighlighted"
        :is-correct-chosen="isCorrectChosen"
        @moved="assessChoice"
        class="h-64"
        ref="questionRef"
      >
        <!-- <expression-image :expression="question" :is-revealed="isImagesStripped"></expression-image> -->

        <div>{{ expression }}</div>
      </left-right-swipe>

      <template v-if="isHighlighted">
        <!-- <expression-image
          :expression="expression"
          :is-revealed="isImagesStripped"
          class="absolute inset-0"
        ></expression-image> -->
      </template>
    </div>
  </div>
</template>
