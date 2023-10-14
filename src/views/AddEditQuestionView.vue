<script setup>
import { useQuestionsStore } from '@/stores/questions';
import router from '../router';

const questionsStore = useQuestionsStore();
let question = {
  description: '',
  answers: []
};

const save = async (event) => {
  event.preventDefault();

  const result = await questionsStore.saveQuestion(question);

  if (result) {
    router.push('/');
  }
};
</script>

<template>
  <div class="container mx-auto mt-20">
    <h2 class="text-2xl mb-2">Add question</h2>

    <form @submit="save">
      <label for="question" class="mb-1 block text-gray-700">Question</label>
      <textarea
        name="question"
        id="question"
        rows="5"
        class="mb-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-300 focus:ring-opacity-50"
        placeholder="description"
        v-model="question.description"
      ></textarea>

      <label for="answer" class="mb-1 block text-gray-700">Answers</label>
      <textarea
        name="answer"
        id="answer"
        rows="5"
        class="mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-300 focus:ring-opacity-50"
        placeholder=""
        v-model="question.answers[0]"
      ></textarea>

      <button
        class="inline-block px-5 py-2 bg-green-600 text-white font-medium text-sm rounded shadow-md"
        type="submit"
      >
        Save
      </button>
    </form>
  </div>
</template>
