<script setup>
import { computed } from 'vue'

const { question, goal, isHighlighted, isCorrectChosen } = defineProps({
  question: { type: String, required: true },
  goal: { type: Number, required: true },
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
})

const expression = computed(() => `${question} = ${goal}`)
</script>

<template>
  <div class="flex justify-between items-center">
    <div v-for="(item, index) in expression.split(' ')" :key="index">
      <div
        class="card flex justify-center items-center size-24"
        :class="{
          'card-success': isHighlighted && isCorrectChosen,
          'card-danger': isHighlighted && !isCorrectChosen,
        }"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>
