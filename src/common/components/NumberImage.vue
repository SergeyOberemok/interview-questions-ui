<script setup>
import { computed } from 'vue'
import { toDigits } from '../utils/numbers'

const { number, isRevealed } = defineProps({
  number: Number,
  isRevealed: Boolean,
})
const digits = computed(() => toDigits(number))
</script>

<template>
  <div class="flex">
    <template v-for="(digit, index) in digits" :key="`${digit}_${index}`">
      <template v-if="!isRevealed">
        <img :src="`${digit}.jpg`" :alt="digit" class="pointer-events-none" />
      </template>
      <div v-else>{{ digit }}</div>
    </template>
  </div>
</template>
