<script setup>
import { ref, watch } from 'vue'

import { generateChoices } from '@/common/utils/numbers'
import { isNumber } from 'lodash-es'

const choices = ref([])
const isCorrectChosen = ref(false)

const { correct } = defineProps({
  correct: {
    type: Number,
    required: true,
    default: 0,
  },
  isHighlighted: Boolean,
})
const emit = defineEmits(['chosen'])
defineExpose({ choices, reset })

function reset() {
  isCorrectChosen.value = false
}

watch(
  () => correct,
  (goal) => isNumber(goal) && (choices.value = generateChoices(goal)),
  { immediate: true },
)
</script>

<template>
  <div class="grid gap-3 grid-cols-2">
    <button
      v-for="(choice, index) in choices"
      :key="`${index}${choice}`"
      @click="((isCorrectChosen = choice === correct), emit('chosen', choice))"
      type="button"
      class="border border-gray-300 rounded-md shadow-sm bg-gray-50"
      :class="{
        'border-2 border-green-300 bg-green-50': isHighlighted && isCorrectChosen,
        'border-2 border-red-300 bg-red-50': isHighlighted && !isCorrectChosen,
      }"
    >
      <slot :number="choice">{{ choice }}</slot>
    </button>
  </div>
</template>
