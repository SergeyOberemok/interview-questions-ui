<script setup>
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline';
import QuestionItem from './QuestionItem.vue';

defineProps({
  questions: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['onEdit'])
</script>

<template>
  <div>
    <div v-if="!questions.length">Empty</div>

    <div v-for="question in questions" :key="question.id">
      <question-item :question="question" class="mb-4">
        <template v-slot:icons>
          <trash-icon
            class="size-5 cursor-pointer me-2"
            @click="emit('onDelete', question.id)"
          ></trash-icon>
          <pencil-square-icon
            class="size-5 cursor-pointer"
            @click="emit('onEdit', question.id)"
          ></pencil-square-icon>
        </template>
      </question-item>
    </div>
  </div>
</template>
