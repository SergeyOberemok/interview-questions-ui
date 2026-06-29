<script setup>
import { computed, reactive } from 'vue'
import { toDigits } from '../../utils/numbers'

const { number, isRevealed } = defineProps({
  number: Number,
  isRevealed: Boolean,
})
const digits = computed(() => toDigits(number))
const failedDigits = reactive(new Set())
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <template v-for="(digit, index) in digits" :key="`${digit}_${index}`">
      <template v-if="!isRevealed && !failedDigits.has(index)">
        <div class="min-w-0 flex-1">
          <img
            :src="`/assets/${digit}.jfif`"
            :alt="digit"
            class="w-full h-auto pointer-events-none"
            @error="failedDigits.add(index)"
          />
        </div>
      </template>
      <div v-else>{{ digit }}</div>
    </template>
  </div>
</template>
