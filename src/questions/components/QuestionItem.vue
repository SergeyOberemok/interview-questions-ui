<script setup>
const props = defineProps({
  question: Object,
  required: true,
})
</script>

<template>
  <div class="wrapper">
    <h3 class="mb-1">{{ question.description }}</h3>

    <div v-for="(answer, index) in question.answers" :key="index" class="mb-3">
      <pre class="whitespace-pre text-sm">{{ answer }}</pre>
    </div>

    <div v-for="(label, index) in question.labels" :key="index">
      <span class="text-sm font-medium text-white bg-blue-400 rounded-md px-2 py-1">{{
        label
      }}</span>
    </div>
  </div>
</template>
