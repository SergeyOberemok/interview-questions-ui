<script setup>
import { ref } from 'vue'

const selectedChoice = ref()

const { choices, isHighlighted, isCorrectChosen } = defineProps({
  choices: {
    type: Array,
    required: true,
    default: () => [],
  },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})
const emit = defineEmits(['chosen'])
defineExpose({ setChoice: (choice) => (selectedChoice.value = choice) })

function isChosen(choice) {
  return selectedChoice.value === choice
}
</script>

<template>
  <div class="grid gap-3 grid-cols-2">
    <button
      v-for="(choice, index) in choices"
      :key="`${index}${choice}`"
      @click="((selectedChoice = choice), emit('chosen', choice))"
      type="button"
      class="btn"
      :class="{
        'btn-success highlighted':
          isHighlighted &&
          ((isCorrectChosen && isChosen(choice)) || (!isCorrectChosen && !isChosen(choice))),
        'btn-danger highlighted': isHighlighted && !isCorrectChosen && isChosen(choice),
      }"
    >
      <slot :number="choice">{{ choice }}</slot>
    </button>
  </div>
</template>
