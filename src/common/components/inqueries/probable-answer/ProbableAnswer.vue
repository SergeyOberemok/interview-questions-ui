<script setup>
import { generateChoices } from '@/common/utils/numbers'
import { ref, watch } from 'vue'

const selectedChoice = ref()
const choices = ref([])

const { goal, isHighlighted, isCorrectChosen } = defineProps({
  goal: {
    type: Number,
    required: true,
  },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})
const emit = defineEmits(['chosen'])
defineExpose({ setChoice: (choice) => (selectedChoice.value = choice), choices })

watch(
  () => goal,
  (value) => (choices.value = generateChoices(value)),
  { immediate: true },
)
</script>

<template>
  <div class="grid gap-3 grid-cols-2">
    <button
      v-for="(choice, index) in choices"
      :key="`${index}${choice}`"
      @click="((selectedChoice = choice), emit('chosen', choice))"
      type="button"
      class="btn bg-gray-50"
      :class="{
        'btn-success highlighted': isHighlighted && choice === goal,
        'btn-danger highlighted': isHighlighted && !isCorrectChosen && choice !== goal,
      }"
    >
      <slot :number="choice">{{ choice }}</slot>
    </button>
  </div>
</template>
