<script setup>
import { ref } from 'vue'

import { splitIntoParts } from '@/core/utils'
import EditableLabelsList from './EditableLabelsList.vue'

const labels = defineModel({ default: [] })
const label = ref('')

function addLabel(event) {
  labels.value = [...labels.value, ...splitIntoParts(label.value)]
  label.value = ''
}
function removeLabel(index) {
  labels.value = labels.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="wrapper flex justify-between items-center">
    <editable-labels-list :labels="labels" @edited="removeLabel"></editable-labels-list>

    <input
      type="text"
      placeholder="Label"
      class="form-input w-48 px-0.5 border-0 border-b-2 border-gray-300 focus:border-gray-400 focus:ring-0"
      v-model.trim="label"
      v-on:keydown.enter.prevent="addLabel"
    />
  </div>
</template>
