<script setup>
import { FwbPagination } from 'flowbite-vue'
import { watch } from 'vue'

import { PAGINATION } from '@/core/shared/constants'
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
const emit = defineEmits(['pageChanged'])
const currentPage = defineModel(1)

watch(currentPage, (page) => emit('pageChanged', page))
</script>

<template>
  <div class="wrapper">
    <div v-if="!questions.length">Empty</div>

    <div v-for="question in questions" :key="question.id">
      <QuestionItem :question="question" class="mb-3" />
    </div>

    <div class="flex justify-center">
      <FwbPagination
        v-if="total"
        v-model="currentPage"
        :total-items="total"
        :per-page="PAGINATION.perPage"
      />
    </div>
  </div>
</template>
