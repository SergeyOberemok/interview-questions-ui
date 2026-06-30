<script setup>
import { computed } from 'vue'
import NumberImage from './NumberImage.vue'
import { splitByNumbers } from '../utils/numbers'
import { isNumber } from 'lodash-es'

const { expression, isRevealed } = defineProps({
  expression: String,
  isRevealed: Boolean,
})

const expressionParts = computed(() => splitByNumbers(expression))
</script>

<template>
  <div class="flex justify-center items-center">
    <template v-for="(part, index) in expressionParts" :key="`${part}_${index}`">
      <template v-if="isNumber(part) && !isRevealed">
        <number-image :number="part"></number-image>
      </template>
      <div v-else>{{ part }}</div>
    </template>
  </div>
</template>
