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
        <slot name="top-right"></slot>
      </div>
    </div>

    <div class="relative">
      <code-snippet :lang="answer.type" :value="answer.detail" class="mb-2">{{
        answer.detail
      }}</code-snippet>
      <div class="absolute inset-y-0 right-0 w-8 flex items-center">
        <slot name="center-right"></slot>
      </div>
    </div>

    <div v-if="answer.note" class="text-xs">Note: {{ answer.note }}</div>
  </div>
</template>
