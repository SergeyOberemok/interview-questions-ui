<script setup>
import { splitIntoParts } from '@/core/utils'
import EditableLabelsList from './EditableLabelsList.vue'
import AddLabel from './AddLabel.vue'
import { Label } from '../shared'

const labels = defineModel({ default: [] })

function addLabelToList(newlabel) {
  const newLabels = splitIntoParts(newlabel).map((label) => new Label({ name: label }))
  labels.value = [...labels.value, ...newLabels]
}
function removeLabelFromList(index) {
  labels.value = labels.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="add-labels-wrapper flex justify-between items-center">
    <editable-labels-list :labels="labels" @edited="removeLabelFromList"></editable-labels-list>

    <add-label @created="addLabelToList"></add-label>
  </div>
</template>
