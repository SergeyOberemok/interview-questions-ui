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
    >
      <slot :number="choice"></slot>
    </button>
  </div>
</template>
