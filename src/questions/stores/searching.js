import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const search = ref('')

  function set(value) {
    search.value = value
  }

  function $reset() {
    search.value = ''
  }

  return { search, set, $reset }
})
