<script setup>
import { FwbPagination } from 'flowbite-vue'

import { PAGINATION } from '@/core/constants'
import QuestionItem from './QuestionItem.vue'

const props = defineProps({
  questions: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
})
const currentPage = defineModel({ default: 1 })
</script>

<template>
  <div class="wrapper">
    <div v-if="!questions.length">Empty</div>

    <div v-for="question in questions" :key="question.id">
      <question-item :question="question" class="mb-3"></question-item>
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
