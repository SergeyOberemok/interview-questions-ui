<script setup>
import { map } from 'lodash-es'
import { computed } from 'vue'

const { results } = defineProps({
  results: { type: Array, required: true },
})

const finalResult = computed(() => map(results, 1).every(Boolean))
</script>

<template>
  <div>
    <table class="table-auto w-full mb-3">
      <thead>
        <tr class="text-left">
          <th>Question</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="([question, result], i) in results" :key="`${question}${i}`">
          <td>
            <slot name="expression" :question="question">{{ question }}</slot>
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
