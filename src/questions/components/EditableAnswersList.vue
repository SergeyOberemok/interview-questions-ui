<script setup>
import { Bars2Icon, XMarkIcon } from '@heroicons/vue/24/solid'
import { useSortable } from '@vueuse/integrations/useSortable'
import { PencilSquareIcon } from '@heroicons/vue/24/outline'
import Answer from './Answer.vue'

const answers = defineModel({
  required: true,
  default: [],
  type: Array,
})
const emit = defineEmits(['selected'])

useSortable('.answers-container', answers, {
  handle: '.sortable-handle',
  animation: 100,
})

function remove(index) {
  answers.value = answers.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="wrapper">
    <h3 class="mb-1" v-if="answers.length > 0">Answers</h3>
    <span v-else>Answers are empty</span>

    <div class="answers-container">
      <template v-for="(answer, index) in answers" :key="answer.hash()" class="mb-3">
        <answer :answer="answer" class="mb-3">
          <pencil-square-icon
            class="size-4 cursor-pointer me-1"
            @click="emit('selected', answer)"
          ></pencil-square-icon>
          <bars2-icon class="size-4 cursor-pointer sortable-handle me-1"></bars2-icon>
          <x-mark-icon class="size-4 cursor-pointer" @click="remove(index)"></x-mark-icon>
        </answer>
      </template>
    </div>
  </div>
</template>
