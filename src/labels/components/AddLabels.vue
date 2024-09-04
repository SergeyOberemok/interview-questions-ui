<script setup>
import { ref } from 'vue'

import LabelsList from './LabelsList.vue'

const labels = defineModel({ default: [] })

const label = ref('')

function addLabel(event) {
  labels.value = [...labels.value, label.value]
  label.value = ''
}
</script>

<template>
  <div class="wrapper flex justify-between items-center">
    <labels-list :labels="labels"></labels-list>

    <input
      type="text"
      placeholder="Label"
      class="form-input w-48 px-0.5 border-0 border-b-2 border-gray-300 focus:border-gray-400 focus:ring-0"
      v-model.trim="label"
      v-on:keydown.enter.prevent="addLabel"
    />
  </div>
</template>
