<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'

import AnswersList from './AnswersList.vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['edited'])
</script>

<template>
  <div class="wrapper">
    <answers-list :answers="answers" v-slot="{ index }">
      <x-mark-icon class="size-4 cursor-pointer" @click="emit('edited', index)"></x-mark-icon>
    </answers-list>
  </div>
</template>
