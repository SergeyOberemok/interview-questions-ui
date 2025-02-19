<script setup>
import { Answer } from '../shared'
import AnswerForm from './AnswerForm.vue'

defineProps({ answer: { type: Answer, required: true } })
const emit = defineEmits(['updated', 'cancelled'])
</script>

<template>
  <div class="wrapper">
    <answer-form :answer="answer" @submitted="emit('updated', $event)">
      <template v-slot:title>Update answer</template>
      <template v-slot:buttons>
        <button
          type="submit"
          class="rounded-md bg-blue-500 px-3 py-1 shadow-sm text-white hover:bg-blue-400 me-3"
        >
          Update
        </button>
        <button
          type="button"
          class="bg-gray-300 px-3 py-1 rounded-md shadow-sm hover:bg-gray-200"
          @click="emit('cancelled')"
        >
          Cancel
        </button>
      </template>
    </answer-form>
  </div>
</template>
