<script setup>
import CopyToClipboard from '@/common/components/CopyToClipboard.vue'
import { ref } from 'vue'
import AnswerItem from './AnswerItem.vue'

const { answers } = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})

const isShown = ref(null)
</script>

<template>
  <div>
    <h3 class="mb-2" v-if="answers.length > 0">Answers</h3>
    <span v-else>Answers are empty</span>

    <div
      v-for="(answer, index) in answers"
      :key="`${answer.detail}_${index}`"
      @mouseover="isShown = index"
      @mouseleave="isShown = null"
    >
      <answer-item :answer="answer" class="mb-2">
        <template #center-right>
          <copy-to-clipboard v-show="isShown === index" :source="answer.detail" />
        </template>
      </answer-item>
    </div>
  </div>
</template>
