<script setup>
import { splitIntoParts } from '@/common/utils'
import { Label } from '../shared'
import AddLabel from './AddLabel.vue'
import EditableLabelsList from './EditableLabelsList.vue'

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
  <div class="flex justify-between items-center">
    <editable-labels-list :labels="labels" @edited="removeLabelFromList"></editable-labels-list>

    <add-label @created="addLabelToList"></add-label>
  </div>
</template>
