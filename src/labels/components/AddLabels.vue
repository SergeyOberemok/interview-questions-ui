<script setup>
import { splitIntoParts } from '@/core/utils'
import EditableLabelsList from './EditableLabelsList.vue'
import AddLabel from './AddLabel.vue'

const labels = defineModel({ default: [] })

function addLabelToList(newlabel) {
  labels.value = [...labels.value, ...splitIntoParts(newlabel)]
}
function removeLabelFromList(index) {
  labels.value = labels.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="wrapper flex justify-between items-center">
    <editable-labels-list :labels="labels" @edited="removeLabelFromList"></editable-labels-list>

    <add-label @created="addLabelToList"></add-label>
  </div>
</template>
