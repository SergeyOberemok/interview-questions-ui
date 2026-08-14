<script setup>
import DragOneFromMany from '@/common/components/inqueries/drag-one-from-many/DragOneFromMany.vue'
import EquationWithVariable from '@/common/components/inqueries/equation-with-variable/EquationWithVariable.vue'
import { generateChoices } from '@/common/utils/numbers'
import { computed } from 'vue'

const { question, goal, operation } = defineProps({
  question: { type: Array, required: true },
  goal: { type: Number, required: true },
  operation: { type: String, required: true },
})
const emit = defineEmits(['answered'])

const choices = computed(() => generateChoices(goal, 4))
</script>

<template>
  <div class="flex flex-col">
    <equation-with-variable
      :question="question"
      :goal="goal"
      :operation="operation"
      class="mb-4"
    ></equation-with-variable>

    <div class="relative">
      <drag-one-from-many
        :choices="choices"
        @selected="emit('answered', $event)"
      ></drag-one-from-many>
    </div>
  </div>
</template>
