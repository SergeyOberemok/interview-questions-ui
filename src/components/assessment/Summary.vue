<script setup>
import { computed } from 'vue'

import ExpressionImage from '@/common/components/ExpressionImage.vue'
import NumberImage from '@/common/components/NumberImage.vue'

const { results, isImagesStripped: isStripped } = defineProps({
  results: Array,
  isImagesStripped: Boolean,
})

const finalResult = computed(() => results?.map((params) => params[3]).every((result) => result))
</script>

<template>
  <div>
    <table class="table-auto w-full mb-3">
      <thead>
        <tr class="text-left">
          <th>Question</th>
          <th>Goal</th>
          <th>Answer</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="([question, goal, answer, result], i) in results" :key="`${question}${i}`">
          <td>
            <expression-image :expression="question" :is-revealed="isStripped"></expression-image>
          </td>
          <td>
            <number-image :number="goal" :is-revealed="isStripped"></number-image>
          </td>
          <td :class="{ 'text-green-500': goal === answer, 'text-red-500': goal !== answer }">
            <number-image :number="answer" :is-revealed="isStripped"></number-image>
          </td>
          <td :class="{ 'text-green-500': result, 'text-red-500': !result }">{{ result }}</td>
        </tr>
      </tbody>
    </table>

    <div
      class="w-full flex justify-center rounded-md shadow-sm"
      :class="{ 'bg-green-50 text-green-500': finalResult, 'bg-red-50 text-red-500': !finalResult }"
    >
      {{ finalResult ? 'Success' : 'Failure' }}
    </div>
  </div>
</template>
