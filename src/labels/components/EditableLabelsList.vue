<script setup>
import { XMarkIcon } from '@heroicons/vue/16/solid'

import LabelsList from './LabelsList.vue'

defineProps({
  labels: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['edited'])
</script>

<template>
  <div class="editable-labels-wrapper">
    <labels-list :labels="labels" v-slot="{ index }">
      <x-mark-icon class="size-3 ml-1 cursor-pointer" @click="emit('edited', index)"></x-mark-icon>
    </labels-list>
  </div>
</template>
