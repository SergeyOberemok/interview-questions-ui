<script setup>
import CodeSnippet from '@/components/CodeSnippet.vue'

const props = defineProps({
  answers: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="wrapper">
    <h3 class="mb-1" v-if="answers.length > 0">Answers</h3>
    <span v-else>Answers are empty</span>

    <div v-for="(answer, index) in answers" :key="index" class="mb-3">
      <div class="flex justify-between">
        <div>{{ answer.title }}</div>

        <slot :index="index"></slot>
      </div>

      <code-snippet :lang="answer.type">{{ answer.answer }}</code-snippet>
    </div>
  </div>
</template>
