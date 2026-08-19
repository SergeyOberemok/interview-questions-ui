<script setup>
import { isNumber } from 'lodash-es'
import { computed } from 'vue'
import { splitByNumbers } from '../../utils/numbers'
import NumberImage from './NumberImage.vue'

const { expression, isRevealed } = defineProps({
  expression: String,
  isRevealed: Boolean,
})

const expressionParts = computed(() => splitByNumbers(expression))
</script>

<template>
  <div class="flex items-center gap-4">
    <template v-for="(part, index) in expressionParts" :key="`${part}_${index}`">
      <template v-if="isNumber(part) && !isRevealed">
        <number-image :number="part"></number-image>
      </template>
      <div v-else>{{ part }}</div>
    </template>
  </div>
</template>
