<script setup>
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

import Answers from './AnswersList.vue'

const props = defineProps({
  question: Object,
  required: true,
})

let isOpened = ref(false)
</script>

<template>
  <div class="wrapper">
    <div class="header flex justify-between items-center">
      <h3 class="mb-1">{{ question.description }}</h3>
      <div class="icon cursor-pointer" @click="isOpened = !isOpened">
        <ChevronDownIcon class="size-5 mx-1" v-if="!isOpened" />
        <ChevronUpIcon class="size-5 mx-1" v-else="isOpened" />
      </div>
    </div>

    <div class="content" v-show="isOpened">
      <answers :answers="question.answers"></answers>

      <div v-if="question.notes" class="mb-3">{{ question.notes }}</div>

      <div class="flex">
        <div v-for="(label, index) in question.labels" :key="index" class="me-1">
          <span class="text-sm font-medium text-white bg-blue-400 rounded-md px-2 py-1">{{
            label
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
