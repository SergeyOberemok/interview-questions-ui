<script setup>
import CodeSnippet from '@/core/components/CodeSnippet.vue'

const { answer } = defineProps({
  answer: { required: true },
})
</script>

<template>
  <div class="wrapper">
    <div class="flex justify-between">
      <div class="mb-1">{{ answer.title }}</div>

      <div class="flex">
        <slot></slot>
      </div>
    </div>

    <code-snippet :lang="answer.type" class>{{ answer.answer }}</code-snippet>
  </div>
</template>
