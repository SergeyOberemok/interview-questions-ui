<script setup>
import CodeSnippet from '@/core/components/CodeSnippet.vue'

const { answer } = defineProps({
  answer: { required: true },
})
</script>

<template>
  <div class="wrapper">
    <div class="flex justify-between mb-1">
      <div>{{ answer.title }}</div>

      <div class="flex">
        <slot></slot>
      </div>
    </div>

    <code-snippet :lang="answer.type" :value="answer.answer" class="mb-1">{{
      answer.answer
    }}</code-snippet>

    <div v-if="answer.note" class="text-xs">Note: {{ answer.note }}</div>
  </div>
</template>
