<script setup>
import Combobox from '@/core/components/Combobox.vue'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { ref, shallowRef, watch } from 'vue'

const label = ref('')
const items = shallowRef([])
const isLoading = ref(false)

const emit = defineEmits(['created'])

async function search(text) {
  items.value = []

  if (!text) {
    return
  }

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

watch(label, (label) => !label && (items.value = []))
</script>

<template>
  <div class="add-label-wrapper">
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
