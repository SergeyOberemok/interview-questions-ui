import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'

export const useQuestionsStore = defineStore('questions', () => {
  const questions = shallowRef([])
  const totalCount = ref(0)

  function find(id) {
    return questions.value.find((question) => question.id === id)
  }

  function addQuestions(value) {
    questions.value = [...value]
  }

  function update(question) {
    const index = questions.value.findIndex((q) => q.id === question.id)
    const newQuestions = [...questions.value]

    newQuestions.splice(index, 1, question)

    questions.value = newQuestions
  }

  function remove(id) {
    questions.value = questions.value.filter((q) => q.id !== id)
  }

  function setTotalCount(value) {
    totalCount.value = value
  }

  function incrementQuestions() {
    totalCount.value++
  }

  function decrementQuestions() {
    totalCount.value--
  }

  function $reset() {
    questions.value = []
    totalCount.value = 0
  }

  return {
    questions,
    totalCount,
    find,
    addQuestions,
    update,
    remove,
    setTotalCount,
    incrementQuestions,
    decrementQuestions,
    $reset,
  }
})
