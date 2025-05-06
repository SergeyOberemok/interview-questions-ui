<script setup>
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'

import LabelsList from '@/labels/components/LabelsList.vue'
import AnswersList from './AnswersList.vue'

defineProps({
  question: { type: Object, required: true },
})

let isOpened = ref(false)
</script>

<template>
  <div class="question-item-wrapper">
    <div class="header flex justify-between items-center">
      <div class="flex">
        <h3 class="me-3">{{ question.description }}</h3>

        <labels-list :labels="question.labels"></labels-list>
      </div>

      <div class="flex">
        <div class="flex">
          <slot name="icons"></slot>
        </div>
        <div @click="isOpened = !isOpened">
          <ChevronDownIcon class="size-5 mx-1 cursor-pointer" v-if="!isOpened" />
          <ChevronUpIcon class="size-5 mx-1 cursor-pointer" v-else="isOpened" />
        </div>
      </div>
    </div>

    <div class="content pt-2" v-show="isOpened">
      <answers-list :answers="question.answers" class="mb-1"></answers-list>

      <div v-if="question.image">
        <img :src="question.image" />
      </div>

      <div v-if="question.notes" class="mb-3">{{ question.notes }}</div>
    </div>
  </div>
</template>
