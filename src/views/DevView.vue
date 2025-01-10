<script setup>
import AnswerForm from '@/questions/components/AnswerForm.vue'
import { ref } from 'vue'
import { faker } from '@faker-js/faker'

const answer = ref()

function refresh() {
  answer.value = {
    title: faker.company.name(),
    answer: faker.company.catchPhrase(),
    type: faker.helpers.arrayElement(['plain', 'js']),
  }
}
</script>

<template>
  <div class="wrapper container mx-auto">
    <answer-form :answer="answer" @submitted="console.log($event)" class="mb-3">
      <template v-slot:title>Add</template>
      <template v-slot:button>Add</template>
    </answer-form>

    <button
      type="button"
      @click="refresh"
      class="border border-gray-300 rounded-md shadow-sm px-2 py-1"
    >
      Refresh
    </button>
  </div>
</template>
