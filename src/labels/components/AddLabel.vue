<script setup>
import Combobox from '@/core/components/Combobox.vue'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { ref } from 'vue'

const emit = defineEmits(['created'])

const label = ref('')
const items = ref([])
const isLoading = ref(false)

async function search(text) {
  if (!text) {
    items.value = []
    return
  }

  items.value = []
  isLoading.value = true

  try {
    const response = await fetch('/api/labels?' + new URLSearchParams({ search: text }).toString())
    const labels = await response.json()

    items.value = labels.map(({ name }) => name)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="wrapper">
    <combobox
      v-model="label"
      :items="items"
      @search="search"
      @selected="((label = ''), emit('created', $event))"
      placeholder="New label"
    >
      <template v-if="isLoading" v-slot:right-icon>
        <arrow-path-icon class="size-3 animate-spin"></arrow-path-icon>
      </template>
    </combobox>
  </div>
</template>
