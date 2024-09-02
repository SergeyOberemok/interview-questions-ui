import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page', () => {
  const defaultPage = 1
  const page = ref(defaultPage)

  function set(value) {
    page.value = value
  }

  function $reset() {
    page.value = defaultPage
  }

  return { page, set, $reset }
})
