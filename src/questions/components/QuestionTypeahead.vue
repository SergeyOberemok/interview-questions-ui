<script setup>
import Combobox from '@/core/components/Combobox.vue'
import { ArrowPathIcon } from '@heroicons/vue/16/solid'
import { ref, shallowRef, watch } from 'vue'
import LabelsList from '@/labels/components/LabelsList.vue'
import { QuestionsRepository } from '@/questions/repositories/questions.repository'

const model = defineModel({ type: String, required: true })
const emit = defineEmits(['selected'])

const questions = shallowRef([])
const isLoading = ref(false)
const questionsRepository = new QuestionsRepository()

async function search(text) {
  questions.value = []

  if (!text) {
    return
  }

  isLoading.value = true

  try {
    const { questions: fetchedQuestions } = await questionsRepository.fetchQuestions(1, 5, text)
    questions.value = fetchedQuestions
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

function mapper(question) {
  return {
    id: question.id,
    description: question.description,
    labels: question.labels,
  }
}

watch(model, (title) => !title && (questions.value = []))
</script>

<template>
  <div class="question-typeahead-wrapper">
    <combobox
      v-model="model"
      :items="questions"
      :mapper="mapper"
      @search="search"
      @selected="emit('selected', $event)"
    >
      <template #right-icon>
        <arrow-path-icon v-if="isLoading" class="size-3 animate-spi"></arrow-path-icon>
      </template>

      <template v-slot="slotProps">
        <div class="flex">
          <span class="me-3">{{ slotProps.item.description }}</span>
          <labels-list :labels="slotProps.item.labels"></labels-list>
        </div>
      </template>
    </combobox>
  </div>
</template>
