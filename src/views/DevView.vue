<script setup>
import Combobox from '@/core/components/Combobox.vue'
import { ref } from 'vue'

const model = ref('')
const items = ref(Array.from(Array(5), (_, i) => i + 1))

function search(text) {
  if (!text) {
    items.value = []
    return
  }

  items.value = Array.from(Array(5), (_, i) => `${text}_${i}`)
}

function selected(text) {}
</script>

<template>
  <div class="wrapper container mx-auto">
    <combobox
      v-model="model"
      :items="items"
      @search="search"
      @selected="selected"
      placeholder="Select"
    ></combobox>
  </div>
</template>
