<script setup>
import AnswerForm from './AnswerForm.vue'

const emit = defineEmits(['added'])
</script>

<template>
  <div class="add-answer-wrapper">
    <answer-form @submitted="emit('added', $event)">
      <template v-slot:title>Add answer</template>
      <template v-slot:button>Add</template>
    </answer-form>
  </div>
</template>
