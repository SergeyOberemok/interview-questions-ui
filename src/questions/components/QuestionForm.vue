<script setup>
import { toRaw } from 'vue'

import { removeFalsyItems } from '@/core/utils'
import AddLabels from '@/labels/components/AddLabels.vue'
import { Question } from '../shared'
import AddAnswers from './AddAnswers.vue'

const question = defineModel({ default: new Question() })
const emit = defineEmits(['edited'])

async function submitForm() {
  emit('edited', removeFalsyItems(toRaw(question.value)))
  question.value.reset()
}
</script>

<template>
  <div class="wrapper">
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
              v-model.trim="question.description"
            />
          </div>

          <div>
            <label>Labes</label>
            <add-labels v-model="question.labels"></add-labels>
          </div>
        </div>

        <div class="mb-3">
          <add-answers v-model="question.answers" class="w-full"></add-answers>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col">
            <label for="notes">Notes</label>
            <textarea
              name="notes"
              id="notes"
              placeholder="Notes"
              class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
              v-model.trim="question.notes"
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
  </div>
</template>
