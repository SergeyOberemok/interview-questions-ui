<script setup>
import { map } from 'lodash-es'
import { computed } from 'vue'

const { results } = defineProps({
  results: { type: Array, required: true },
})

const finalResult = computed(() => map(results, 'result').every(Boolean))
</script>

<template>
  <div>
    <table class="table-auto w-full mb-2 border-separate border-spacing-y-2">
      <thead>
        <tr class="text-left">
          <th>Question</th>
          <th>Answer</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="{ id, question, answer, result } in results"
          :key="id"
          :class="{ 'text-green-500': result, 'text-red-500': !result }"
        >
          <td>
            <slot name="expression" :question="question" :is-correct="result">{{ question }}</slot>
          </td>
          <td>
            <slot name="image" :answer="answer" :is-correct="result">{{ answer }}</slot>
          </td>
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
