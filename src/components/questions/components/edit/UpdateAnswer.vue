<script setup>
import { Answer } from '@/components/questions/models/answer.model.js'
import EditAnswer from './EditAnswer.vue'

defineProps({ answer: { type: Answer, required: true } })
const emit = defineEmits(['updated', 'cancelled'])
</script>

<template>
  <div>
    <edit-answer :answer="answer" @submitted="emit('updated', $event)">
      <template v-slot:title>Update answer</template>
      <template v-slot:buttons>
        <button
          type="submit"
          class="rounded-md bg-blue-500 px-4 py-1 shadow-sm text-white hover:bg-blue-400 me-4"
        >
          Update
        </button>
        <button
          type="button"
          class="bg-gray-300 px-4 py-1 rounded-md shadow-sm hover:bg-gray-200"
          @click="emit('cancelled')"
        >
          Cancel
        </button>
      </template>
    </edit-answer>
  </div>
</template>
