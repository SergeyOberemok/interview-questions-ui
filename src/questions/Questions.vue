<script setup>
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { identity, pickBy } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'

import Search from '@/core/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'
import { usePageStore, useQuestionsStore, useSearchStore } from './stores'

const isLoading = ref(false)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()
const questionsStore = useQuestionsStore()

onMounted(async () => fetchQuestions())

async function fetchQuestions() {
  if (questionsStore.isLoaded) {
    return
  }

  isLoading.value = true

  try {
    const response = await fetch(
      '/api/questions?' +
        new URLSearchParams(
          pickBy(
            {
              page: pageStore.page,
              size: PAGINATION.perPage,
              search: searchStore.search,
            },
            identity,
          ),
        ).toString(),
    )
    const { questions, total } = await response.json()

    questionsStore.setQuestions(questions.map((question) => new Question(question)))
    questionsStore.setTotalCount(total)
  } catch (error) {
    console.error(error)
    questionsStore.$reset()
  } finally {
    isLoading.value = false
  }
}

pageStore.$subscribe(() => (questionsStore.$reset(), fetchQuestions()))
searchStore.$subscribe(() => (questionsStore.$reset(), pageStore.$reset(), fetchQuestions()))

function updateSearch(newSearch) {
  searchStore.set(newSearch)
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-3 text-xl">Questions</h1>

    <search @changed="updateSearch" class="mb-3">
      <template v-if="isLoading" v-slot:right-icon>
        <arrow-path-icon class="size-3 animate-spin"></arrow-path-icon>
      </template>
    </search>

    <questions-list
      :questions="questionsStore.questions"
      :total="questionsStore.totalCount"
      v-model="page"
      class="mb-3"
    ></questions-list>

    <div v-if="isLoading">Loading...</div>
  </div>
</template>
