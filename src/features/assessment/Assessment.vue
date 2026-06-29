<script setup>
import ExpressionImage from '@/common/components/number-image/ExpressionImage.vue'
import NumberImage from '@/common/components/number-image/NumberImage.vue'
import Stepper from '@/common/components/stepper/Stepper.vue'
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import InqueryWrapper from '../inqueries/inquiry-wrapper/InqueryWrapper.vue'
import AssessmentControls from './components/AssessmentControls.vue'
import AssessmentSummary from './components/AssessmentSummary.vue'

const ASSESSMENT_QUANTITY = +import.meta.env.VITE_ASSESSMENT_QUANTITY || 5
const TIMEOUT = 1500

const assessmentQuantity = ref(ASSESSMENT_QUANTITY)
const assessmentStore = useAssessmentStore()
const {
  isStarted,
  isEnded,
  question,
  goal,
  isCorrect: isCorrectChosen,
  results,
  isAnswered,
  resultsWithAnswers,
} = storeToRefs(assessmentStore)
const stepperRef = useTemplateRef('stepperRef')
const controlsRef = useTemplateRef('controlsRef')
const isPausing = ref(false)
const isStripped = ref(false)

onMounted(() => assessmentStore.bindEvents())

async function assess(answer) {
  isPausing.value = true
  await assessmentStore.assess(answer)
  await promiseTimeout(TIMEOUT)
  isPausing.value = false
}

watch(isEnded, (ended) => {
  if (ended) {
    controlsRef.value?.reset()
  }
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <h1 class="text-2xl font-bold">
      <span>Assessment</span>
      <span v-if="!isStarted && !isPausing && results.length > 0">Summary</span>
    </h1>

    <stepper
      v-if="isStarted || isPausing"
      :steps-count="assessmentQuantity"
      @next="async () => await assessmentStore.nextQuestion()"
      @prev="async () => await assessmentStore.prevQuestion()"
      ref="stepperRef"
    >
      <template #prompt>
        <inquery-wrapper
          :question="question"
          :args="{ goal, isHighlighted: isAnswered, isCorrectChosen, isImagesStripped: isStripped }"
          @answered="(answer) => assess(answer).then(() => stepperRef?.next())"
        ></inquery-wrapper>
      </template>
    </stepper>

    <template v-else-if="results.length > 0">
      <assessment-summary :results="resultsWithAnswers">
        <template v-slot:expression="slotProps">
          <expression-image
            :expression="slotProps.question"
            :is-revealed="isStripped"
            :class="{ 'bg-green-100': slotProps.isCorrect, 'bg-red-100': !slotProps.isCorrect }"
          ></expression-image>
        </template>
        <template v-slot:image="slotProps">
          <number-image
            :number="slotProps.answer"
            :is-revealed="isStripped"
            :class="{ 'bg-green-100': slotProps.isCorrect, 'bg-red-100': !slotProps.isCorrect }"
          ></number-image>
        </template>
      </assessment-summary>
    </template>

    <assessment-controls
      v-model="assessmentQuantity"
      @started="async () => await assessmentStore.start(assessmentQuantity)"
      @ended="async () => await assessmentStore.end()"
      @next="stepperRef?.next()"
      @prev="stepperRef?.prev()"
      @stripped="isStripped = $event"
      ref="controlsRef"
    >
      <button type="button" @click="isStripped = !isStripped" class="btn">
        {{ isStripped ? 'Hinder' : 'Strip' }}
      </button>
    </assessment-controls>
  </div>
</template>
