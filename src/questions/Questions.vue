<script setup>
import { identity, pickBy } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Search from '@/core/components/Search.vue'
import { PAGINATION } from '@/core/constants'
import QuestionsList from './components/QuestionsList.vue'
import { Question } from './shared/question.model'
import { usePageStore, useQuestionsStore, useSearchStore } from './stores'

const isLoading = ref(false)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()
const { search } = storeToRefs(searchStore)
const questionsStore = useQuestionsStore()
const router = useRouter()

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
              search: search.value,
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

function updateSearch() {
  questionsStore.$reset(), pageStore.$reset(), fetchQuestions()
}

function navigateToEditQuestion(id) {
  router.push({ name: 'edit-question', params: { id } })
}
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-3 text-xl">Questions</h1>

    <search v-model="search" :is-loading="isLoading" @changed="updateSearch" class="mb-3"></search>

    <questions-list
      :questions="questionsStore.questions"
      :total="questionsStore.totalCount"
      v-model="page"
      class="mb-3"
      @selected-to-edit="navigateToEditQuestion"
    ></questions-list>

    <div v-if="isLoading">Loading...</div>
  </div>
</template>
