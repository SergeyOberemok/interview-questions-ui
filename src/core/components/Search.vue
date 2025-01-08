<script setup>
import { debounce } from 'lodash-es'
import { ref } from 'vue'

const search = ref('')
const emit = defineEmits(['changed'])

const searchTypeahead = debounce(() => {
  emit('changed', search.value)
}, 500)
</script>

<template>
  <div class="wrapper">
    <input
      type="text"
      id="search"
      placeholder="Search"
      class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-200"
      v-model.trim="search"
      @input="searchTypeahead"
    />
  </div>
</template>
