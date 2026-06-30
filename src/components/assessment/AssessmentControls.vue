<script setup>
import { ref } from 'vue'

import QuantitySelect from '@/common/components/QuantitySelect.vue'

const quantity = defineModel({
  type: Number,
})
const emit = defineEmits(['started', 'stripped'])

const isImagesStripped = ref(false)
</script>

<template>
  <div class="flex justify-between">
    <button type="button" @click="emit('started')" class="ctl w-18 px-2 py-1 me-3">Start</button>

    <button
      type="button"
      @click="((isImagesStripped = !isImagesStripped), emit('stripped', isImagesStripped))"
      class="ctl w-18 px-2 py-1"
    >
      {{ isImagesStripped ? 'Hinder' : 'Strip' }}
    </button>

    <quantity-select v-model="quantity" class="w-18"></quantity-select>
  </div>
</template>
