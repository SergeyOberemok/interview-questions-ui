<script setup>
import { useQuestionsStore } from '@/stores/questions';
import QuestionItem from './QuestionItem.vue';

const questionsStore = useQuestionsStore();

await questionsStore.loadQuestions();
</script>

<template>
  <div class="container mx-auto">
    <h2 class="text-center text-2xl">Questions</h2>

    <QuestionItem
      v-for="question in questionsStore.questions"
      :question="question"
      :key="question._id"
    />
  </div>
</template>
