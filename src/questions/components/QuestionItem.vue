<script setup>
import { ChevronDownIcon, ChevronUpIcon, PencilSquareIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import LabelsList from '@/labels/components/LabelsList.vue'
import AnswersList from './AnswersList.vue'

const props = defineProps({
  question: Object,
  required: true,
})

const router = useRouter()
let isOpened = ref(false)

function navigateToEditQuestion() {
  router.push({ name: 'edit-question', params: { id: props.question.id } })
}
</script>

<template>
  <div class="wrapper">
    <div class="header flex justify-between items-center">
      <div class="flex">
        <h3 class="me-3">{{ question.description }}</h3>

        <labels-list :labels="question.labels"></labels-list>
      </div>

      <div class="flex">
        <div class="icon cursor-pointer" @click="navigateToEditQuestion">
          <PencilSquareIcon class="size-5 mx-1" />
        </div>
        <div class="icon cursor-pointer" @click="isOpened = !isOpened">
          <ChevronDownIcon class="size-5 mx-1" v-if="!isOpened" />
          <ChevronUpIcon class="size-5 mx-1" v-else="isOpened" />
        </div>
      </div>
    </div>

    <div class="content pt-2" v-show="isOpened">
      <answers-list :answers="question.answers" class="mb-1"></answers-list>

      <div v-if="question.notes" class="mb-3">{{ question.notes }}</div>
    </div>
  </div>
</template>
