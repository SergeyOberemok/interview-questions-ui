<script setup>
import { FwbPagination } from 'flowbite-vue'
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

import { PAGINATION } from '@/core/constants'
import QuestionItem from './QuestionItem.vue'

const currentPage = defineModel({ default: 1 })
defineProps({
  questions: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
const emit = defineEmits(['onEdit'])
</script>

<template>
  <div class="questions-list-wrapper">
    <div v-if="!questions.length">Empty</div>

    <div v-for="question in questions" :key="question.id">
      <question-item :question="question" class="mb-3">
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

    <div class="flex justify-center">
      <fwb-pagination
        v-if="total"
        v-model="currentPage"
        :total-items="total"
        :per-page="PAGINATION.perPage"
      ></fwb-pagination>
    </div>
  </div>
</template>
