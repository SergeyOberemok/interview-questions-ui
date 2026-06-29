<script setup>
import { ref } from 'vue'
import { Answer } from '../../models/answer.model.js'
import EditAnswer from './EditAnswer.vue'

const answer = ref(new Answer())
const emit = defineEmits(['added'])
</script>

<template>
  <div>
    <edit-answer v-model="answer" @submitted="emit('added', answer)">
      <template v-slot:title>Add answer</template>
      <template v-slot:buttons>
        <button type="submit" class="btn btn-primary">Add</button>
      </template>
    </edit-answer>
  </div>
</template>
