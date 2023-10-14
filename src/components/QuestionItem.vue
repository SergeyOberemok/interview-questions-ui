<script setup>
const props = defineProps({
  question: {}
});
</script>

<template>
  <div class="container">
    <h4 class="text-lg">Question</h4>

    <div>{{ question.description }}</div>

    <h4 class="text-lg">Answers</h4>

    <div v-for="(answer, index) in question.answers" :key="index">
      {{ answer }}
    </div>
  </div>
</template>
