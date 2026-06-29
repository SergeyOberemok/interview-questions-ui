<script setup>
import EditAnswer from './EditAnswer.vue';

const emit = defineEmits(['added'])
</script>

<template>
  <div>
    <edit-answer @submitted="emit('added', $event)">
      <template v-slot:title>Add answer</template>
      <template v-slot:buttons>
        <button type="submit" class="btn">Add</button>
      </template>
    </edit-answer>
  </div>
</template>
