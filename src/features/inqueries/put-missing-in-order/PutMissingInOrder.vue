<script setup>
import DragOneFromMany from '@/common/components/inqueries/drag-one-from-many/DragOneFromMany.vue'
import EquationWithVariable from '@/common/components/inqueries/equation-with-variable/EquationWithVariable.vue'
import { generateChoices } from '@/common/utils/numbers'
import { computed } from 'vue'

const { question, goal, isHighlighted, isCorrectChosen } = defineProps({
  question: { type: String, required: true },
  goal: { type: Number, required: true },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})
const emit = defineEmits(['answered'])

const choices = computed(() => generateChoices(goal, 4))
</script>

<template>
  <div class="flex flex-col">
    <equation-with-variable
      :question="question"
      :goal="goal"
      :is-highlighted="isHighlighted"
      :is-correct-chosen="isCorrectChosen"
      class="mb-4"
    ></equation-with-variable>

    <div class="relative">
      <drag-one-from-many
        :choices="choices"
        :is-highlighted="isHighlighted"
        :is-correct-chosen="isCorrectChosen"
        @selected="emit('answered', $event)"
      ></drag-one-from-many>
    </div>
  </div>
</template>
