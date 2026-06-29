<script setup>
import { computed } from 'vue'

const { operation } = defineProps({
  operation: {
    type: String,
    required: true,
  },
})

const colorClass = computed(() => {
  switch (operation) {
    case '+':
      return 'text-yellow-500'
    case '-':
      return 'text-blue-400'
    case '*':
      return 'text-green-600'
    case '/':
      return 'text-gray-500'
    default:
      return ''
  }
})
</script>

<template>
  <div class="text-3xl" :class="colorClass">{{ operation }}</div>
</template>
