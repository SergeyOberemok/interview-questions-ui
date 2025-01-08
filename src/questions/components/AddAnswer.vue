<script setup>
import { ref } from 'vue'

import { LANGUAGES, LANGUAGE_DEFAULT } from '@/core/constants'
import { removeFalsyItems } from '@/core/utils'

const title = ref('')
const description = ref('')
const type = ref(LANGUAGE_DEFAULT)

const emit = defineEmits(['added'])

function reset() {
  title.value = ''
  description.value = ''
  type.value = LANGUAGE_DEFAULT
}

function submitForm() {
  const answer = {
    title: title.value,
    answer: description.value,
    type: type.value,
  }

  emit('added', removeFalsyItems(answer))
  reset()
}
</script>

<template>
  <div class="wrapper">
    <h5 class="mb-3">Add answer</h5>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="title"
        />
      </div>

      <div class="flex flex-col mb-3">
        <label for="answer">Answer</label>
        <textarea
          name="answer"
          id="answer"
          class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="description"
        ></textarea>
      </div>

      <div class="flex justify-between items-end">
        <div class="flex flex-col">
          <label for="type">Type</label>
          <select
            name="type"
            id="type"
            class="form-select w-32 rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
            v-model="type"
          >
            <option value="plain" selected>Text</option>
            <option :value="type" v-for="[type, language] in Object.entries(LANGUAGES)">
              {{ language }}
            </option>
          </select>
        </div>

        <button
          type="submit"
          class="w-16 rounded-md bg-blue-500 p-1 shadow-sm text-white hover:bg-blue-400"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</template>
