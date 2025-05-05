<script setup>
import Search from '@/core/components/Search.vue'
import { debounce } from 'lodash-es'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import QuestionsList from './components/QuestionsList.vue'
import { QuestionsService } from './services/questions.service'
import { usePageStore, useQuestionsStore, useSearchStore } from './stores'

const isLoading = ref(false)
const pageStore = usePageStore()
const { page } = storeToRefs(pageStore)
const searchStore = useSearchStore()
const { search } = storeToRefs(searchStore)
const questionsStore = useQuestionsStore()
const { totalCount } = storeToRefs(questionsStore)
const router = useRouter()
const questionsService = new QuestionsService()
const fetchQuestionsDebounce = debounce(() => fetchQuestions(), 1000, {
  leading: true,
  trailing: false,
})

onMounted(fetchQuestionsDebounce)
pageStore.$subscribe(fetchQuestionsDebounce)
watch(totalCount, fetchQuestionsDebounce)

async function fetchQuestions() {
  isLoading.value = true

  await questionsService.fetchQuestions()

  isLoading.value = false
}

async function removeQuestion(id) {
  await questionsService.removeQuestion(id)
}

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
      @on-edit="navigateToEditQuestion"
      @on-delete="removeQuestion"
    ></questions-list>

    <div v-if="isLoading">Loading...</div>
  </div>
</template>
