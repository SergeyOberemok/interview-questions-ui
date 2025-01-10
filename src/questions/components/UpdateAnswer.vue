<script setup>
import AnswerForm from './AnswerForm.vue'

defineProps({ answer: { type: Object, required: true } })
const emit = defineEmits(['updated'])
</script>

<template>
  <div class="wrapper">
    <answer-form :answer="answer" @submitted="emit('updated', $event)">
      <template v-slot:title>Update answer</template>
      <template v-slot:button>Update</template>
    </answer-form>
  </div>
</template>
