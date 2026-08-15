<script setup>
import Stepper from '@/common/components/Stepper.vue'
import { useAssessmentStore } from '@/stores/assessment.store'
import { promiseTimeout } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { onMounted, ref, useTemplateRef } from 'vue'
import AssessmentControls from './components/AssessmentControls.vue'

const ASSESSMENT_QUANTITY = +import.meta.env.VITE_ASSESSMENT_QUANTITY || 5
const TIMEOUT = 1500

const assessmentQuantity = ref(ASSESSMENT_QUANTITY)
const assessmentStore = useAssessmentStore()
const { isStarted, question, isStripped, results } = storeToRefs(assessmentStore)
const isHighlighted = ref(false)
const stepperRef = useTemplateRef('stepperRef')

onMounted(() => assessmentStore.bindEvents())

async function assess(answer) {
  await assessmentStore.assess(answer)

  isHighlighted.value = true

  return promiseTimeout(TIMEOUT).then(() => (isHighlighted.value = false))
}
</script>

<template>
  <div class="flex flex-col">
    <h1 class="text-2xl font-bold mb-4">Assessment</h1>

    <stepper
      v-if="isStarted"
      :steps-count="assessmentQuantity"
      @next="async () => await assessmentStore.nextQuestion()"
      @prev="async () => await assessmentStore.prevQuestion()"
      ref="stepperRef"
      class="mb-4"
    >
      <template #prompt>
        <inquery-wrapper :question="question" @answered="assess"></inquery-wrapper>
      </template>
      <template #summary>
        Summary
        <!-- <summaries :results="results" :is-images-stripped="isStripped"></summaries> -->
      </template>
    </stepper>

    <assessment-controls
      v-model="assessmentQuantity"
      @started="async () => await assessmentStore.start(assessmentQuantity)"
      @ended="async () => await assessmentStore.end()"
      @next="stepperRef.next()"
      @prev="stepperRef.prev()"
      @stripped="isStripped = $event"
    ></assessment-controls>
  </div>
</template>
