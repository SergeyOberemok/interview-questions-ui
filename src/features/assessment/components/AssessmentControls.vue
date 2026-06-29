<script setup>
import { ref } from 'vue'

import QuantitySelect from '@/common/components/quantity-select/QuantitySelect.vue'

const quantity = defineModel({
  type: Number,
})
const emit = defineEmits(['started', 'ended', 'next', 'prev'])
defineExpose({
  reset,
})

const isStarted = ref(false)

function reset() {
  isStarted.value = false
}
</script>

<template>
  <div class="flex justify-between">
    <template v-if="!isStarted">
      <button type="button" @click="(emit('started'), (isStarted = true))" class="btn">
        Start
      </button>
      <quantity-select v-model="quantity" class="w-18"></quantity-select>
    </template>

    <template v-else>
      <button @click="emit('prev')" type="button" class="btn">Previous</button>

      <slot></slot>
      <button @click="(emit('ended'), (isStarted = false))" type="button" class="btn">End</button>

      <button @click="emit('next')" type="button" class="btn">Next</button>
    </template>
  </div>
</template>
