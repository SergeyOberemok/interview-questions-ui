<script setup>
import { Answer } from '@/features/answers/models/answer.model.js'
import { ref, watchEffect } from 'vue'
import EditAnswer from './EditAnswer.vue'

const { answer } = defineProps({ answer: { type: Answer, required: true } })
const model = ref()
const emit = defineEmits(['updated', 'cancelled'])

watchEffect(() => {
  if (!answer) {
    return
  }

  model.value = new Answer(answer)
})
</script>

<template>
  <div>
    <edit-answer v-model="model" @submitted="emit('updated', model)">
      <template v-slot:title>Update answer</template>
      <template v-slot:buttons>
        <button type="submit" class="btn btn-primary me-4">Update</button>
        <button type="button" class="btn btn-secondary" @click="emit('cancelled')">Cancel</button>
      </template>
    </edit-answer>
  </div>
</template>
