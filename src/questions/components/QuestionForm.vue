<script setup>
import { toRaw } from 'vue'
import { removeFalsyItems } from '@/core/utils'
import AddLabels from '@/labels/components/AddLabels.vue'
import { Question } from '../shared'
import AddAnswers from './AddAnswers.vue'
import CanvasPainter from '@/core/components/CanvasPainter.vue'

const question = defineModel({ default: new Question() })
const emit = defineEmits(['edited', 'cancelled'])

async function submitForm() {
  emit('edited', removeFalsyItems(toRaw(question.value)))
  question.value.reset()
}
</script>

<template>
  <div class="wrapper">
    <form class="flex flex-col" @submit.prevent="submitForm">
      <div class="wrapper container mx-auto mb-3">
        <div class="grid grid-cols-2 gap-3 mb-3">
          <div>
            <label for="description">Description</label>
            <slot :question="question">
              <input
                type="text"
                id="description"
                class="form-input w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-100"
                v-model.trim="question.description"
              />
            </slot>
          </div>

          <div>
            <label>Labes</label>
            <add-labels v-model="question.labels"></add-labels>
          </div>
        </div>

        <div class="mb-3">
          <add-answers v-model="question.answers" class="w-full"></add-answers>
        </div>

        <div class="mb-3">
          <canvas-painter v-model="question.image"></canvas-painter>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="flex flex-col">
            <label for="notes">Notes</label>
            <textarea
              name="notes"
              id="notes"
              class="form-textarea w-full rounded-md border border-gray-300 focus:border-gray-400 focus:ring-gray-100"
              v-model.trim="question.notes"
            ></textarea>
          </div>

          <div class="flex justify-end items-end">
            <button
              type="submit"
              class="w-24 p-1 rounded-md bg-blue-500 shadow-sm text-white hover:bg-blue-600 me-2"
            >
              Submit
            </button>

            <button
              type="button"
              class="w-24 p-1 rounded-md bg-gray-300 shadow-sm hover:bg-gray-200"
              @click="emit('cancelled')"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
