<script setup>
import { makeIterator } from '@/common/utils/iterator'
import { computed, onMounted, ref, watch } from 'vue'

let iterator = null
const currentStep = ref()
const activeIndex = computed(() => steps.indexOf(currentStep.value))

const { steps } = defineProps({
  steps: {
    type: Array,
    default: () => [],
  },
})
const emit = defineEmits(['next', 'prev', 'complete'])
defineExpose({
  currentStep,
  next: goNext,
  prev: goPrev,
})

onMounted(() => initSteps(steps))

function initSteps(steps) {
  if (!steps.length) {
    return
  }

  iterator = makeIterator(steps)
  goNext()
}

function goToStep(step) {
  if (!['next', 'prev'].includes(step)) {
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
}

watch(() => steps, initSteps)
</script>

<template>
  <div>
    <h5 class="mb-2">Step {{ activeIndex }}</h5>

    <div class="mb-3">
      <slot></slot>
    </div>
  </div>
</template>
