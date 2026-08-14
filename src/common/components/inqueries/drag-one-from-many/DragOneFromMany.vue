<script setup>
import DraggableChoice from './DraggableChoice.vue'

const { choices } = defineProps({ choices: { type: Array, required: true } })
const emit = defineEmits(['selected'])
</script>

<template>
  <div class="flex justify-between">
    <template v-for="(choice, index) in choices" :key="index">
      <draggable-choice :index="index">
        <div class="card size-24 flex items-center justify-center cursor-pointer">
          <span @click="emit('selected', choice)">{{ choice }}</span>
        </div>
      </draggable-choice>
    </template>
  </div>
</template>
