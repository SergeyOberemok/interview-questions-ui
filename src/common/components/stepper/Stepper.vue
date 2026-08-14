<script setup>
import { makeIterator } from '@/common/utils/iterator'
import { computed, onMounted, ref, watch } from 'vue'

let iterator = null
const currentStep = ref()
const activeIndex = computed(() => steps.value.indexOf(currentStep.value))
const steps = ref([])

const { stepsCount } = defineProps({
  stepsCount: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['next', 'prev', 'complete'])
defineExpose({
  currentStep,
  next: goNext,
  prev: goPrev,
})

onMounted(() => initSteps(stepsCount))

function initSteps(count) {
  if (count <= 0) {
    return
  }

  steps.value = [
    ...Array.from(Array(count), (_, i) => ({ id: i, name: 'prompt' })),
    { id: count, name: 'summary' },
  ]
  iterator = makeIterator(steps.value)
  goNext()
}

function goToStep(step) {
  if (!['next', 'prev'].includes(step) || !iterator) {
    return
  }

  const { value, done } = iterator[step]()

  if (done) {
    emit('complete', done)
    reset()

    return
  }

  currentStep.value = value
  emit(step, currentStep.value)
}

function goNext() {
  goToStep('next')
}

function goPrev() {
  goToStep('prev')
}

function reset() {
  currentStep.value = null
  iterator = null
  steps.value = []
}

watch(() => stepsCount, initSteps)
// watch(isStarted, (isStarted) => isStarted && initSteps())
// watch(isFinished, (isFinished) => isFinished && reset())
</script>

<template>
  <div>
    <h5 class="mb-2">Step {{ activeIndex }}</h5>

    <template v-for="step in steps" :key="step.id">
      <div v-if="$slots[step.name] && step === currentStep">
        <slot :name="step.name">{{ step.name }}</slot>
      </div>
    </template>
  </div>
</template>
