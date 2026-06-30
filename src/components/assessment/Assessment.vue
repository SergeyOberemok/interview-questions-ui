<script setup>
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import AssessmentControls from './AssessmentControls.vue'

const ASSESSMENT_QUANTITY = +import.meta.env.VITE_ASSESSMENT_QUANTITY || 5
const TIMEOUT = 1500

const assessmentQuantity = ref(ASSESSMENT_QUANTITY)
const assessmentStore = useAssessmentStore()
const { isStarted, question, goal, isStripped, isCorrect, results } = storeToRefs(assessmentStore)
const steps = ref([])
const isHighlighted = ref(false)
const isFinished = ref(false)
// const stepperRef = useTemplateRef('stepperRef')

onMounted(() => assessmentStore.bindEvents())

function initSteps() {
  steps.value = [...Array.from(Array(assessmentQuantity.value), () => 'prompt'), 'summary']
}

async function nextQuestion() {
  await assessmentStore.nextQuestion()
}

async function assess(answer) {
  await assessmentStore.assess(answer)

  isHighlighted.value = true

  return promiseTimeout(TIMEOUT).then(() => (isHighlighted.value = false))
}

function reset() {
  steps.value = []
}

watch(isStarted, (isStarted) => isStarted && initSteps())
watch(isFinished, (isFinished) => isFinished && reset())
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold mb-3">Assessment</h1>

    <assessment-controls
      class="mb-4"
      v-model="assessmentQuantity"
      @started="async () => await assessmentStore.start(assessmentQuantity)"
      @stripped="isStripped = $event"
    ></assessment-controls>

    <!-- <stepper
      :steps="steps"
      @next="nextQuestion"
      @complete="($event) => (isFinished = $event)"
      ref="stepperRef"
    >
      <steps>
        <template #prompt>
          <prompt
            :question="question"
            :goal="goal"
            :is-images-stripped="isStripped"
            :is-highlighted="isHighlighted"
            :is-correct="isCorrect"
            @answered="(answer) => assess(answer).then(() => stepperRef.next())"
          ></prompt>
        </template>
        <template #summary>
          <summaries :results="results" :is-images-stripped="isStripped"></summaries>
        </template>
      </steps>
    </stepper> -->
  </div>
</template>
