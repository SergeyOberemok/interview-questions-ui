<script setup>
import { compact, flatten, sample, zip } from 'lodash-es'
import { computed } from 'vue'
import Variable from './variable'

const { question, goal, operation } = defineProps({
  question: { type: Array, required: true },
  goal: { type: Number, required: true },
  operation: { type: String, required: true },
})

const variables = computed(() => question.concat(goal).map((value) => new Variable(value)))
const expression = computed(() => compact(flatten(zip(variables.value, [operation, '=']))))
const randomVariable = computed(() => sample(variables.value))
</script>

<template>
  <div class="flex justify-between items-center">
    <div v-for="(item, index) in expression" :key="index">
      <div v-if="item instanceof Variable" class="card flex justify-center items-center size-24">
        <template v-if="item === randomVariable">
          <span>?</span>
        </template>
        <template v-else>
          <span>{{ item }}</span>
        </template>
      </div>
      <span v-else>{{ item }}</span>
    </div>
  </div>
</template>
