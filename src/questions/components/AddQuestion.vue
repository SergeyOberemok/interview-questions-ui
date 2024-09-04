<script setup>
import { ref, shallowRef } from 'vue'

import { removeFalsyItems } from '@/core/utils'
import AddLabels from '@/labels/components/AddLabels.vue'
import router from '@/router'
import AddAnswers from './AddAnswers.vue'

const description = ref('')
const answers = shallowRef([])
const notes = ref('')
const labels = ref([])

async function submitForm() {
  const question = {
    description: description.value,
    answers: answers.value,
    notes: notes.value,
    labels: labels.value,
  }

  await postQuestion(removeFalsyItems(question))

  resetForm()
  router.push('/questions')
}

async function postQuestion(question) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(question),
  }

  const response = await fetch('/api/questions', options)
  const data = await response.json()
}

function resetForm() {
  description.value = ''
  answers.value = []
  notes.value = ''
  labels.value = []
}
</script>

<template>
  <form class="flex flex-col" @submit.prevent="submitForm">
    <div class="wrapper container mx-auto mb-3">
      <div class="columns-2 mb-3">
        <div>
          <label for="description">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-200"
            v-model.trim="description"
          />
        </div>

        <div>
          <label>Labes</label>
          <add-labels v-model="labels"></add-labels>
        </div>
      </div>

      <div class="mb-3">
        <add-answers v-model="answers"></add-answers>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div class="flex flex-col">
          <label for="notes">Notes</label>
          <textarea
            name="notes"
            id="notes"
            placeholder="Notes"
            class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
            v-model.trim="notes"
          ></textarea>
        </div>

        <div class="flex justify-end items-end">
          <button
            type="submit"
            class="w-24 rounded-md bg-blue-500 p-1 shadow-sm text-white hover:bg-blue-400"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
