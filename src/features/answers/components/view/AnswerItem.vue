<script setup>
import CodeSnippet from '@/common/components/CodeSnippet.vue'

const { answer } = defineProps({
  answer: { required: true },
})
</script>

<template>
  <div>
    <div class="flex justify-between mb-2">
      <div>{{ answer.title }}</div>

      <div class="flex">
        <slot></slot>
      </div>
    </div>

    <code-snippet :lang="answer.type" :value="answer.detail" class="mb-2">{{
      answer.detail
    }}</code-snippet>

    <div v-if="answer.note" class="text-xs">Note: {{ answer.note }}</div>
  </div>
</template>
