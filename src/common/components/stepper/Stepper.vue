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
const emit = defineEmits(['next', 'complete'])
defineExpose({
  currentStep,
  next: goNext,
})

onMounted(() => initSteps(steps))

function initSteps(steps) {
  if (!steps.length) {
    return
  }

  iterator = makeIterator(steps)
  goNext()
}

function goNext() {
  const { value, done } = iterator.next()

  if (done) {
    emit('complete', done)
    reset()

    return
  }

  currentStep.value = value
  emit('next', currentStep.value)
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

    <div class="flex justify-between">
      <button
        @click="console.log('prev')"
        type="button"
        class="border border-gray-300 rounded-md shadow-sm px-3 py-1"
      >
        Previous
      </button>
      <button
        @click="goNext"
        type="button"
        class="border border-gray-300 rounded-md shadow-sm px-3 py-1"
      >
        Next
      </button>
    </div>
  </div>
</template>
