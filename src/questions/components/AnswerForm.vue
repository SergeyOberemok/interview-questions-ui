<script setup>
import { ref, watchEffect } from 'vue'

import BeautifyArea from '@/core/components/BeautifyArea.vue'
import { LANGUAGES, LANGUAGE_DEFAULT } from '@/core/constants'
import { Answer } from '../shared'

const { answer } = defineProps({
  answer: {
    type: [Answer, null],
  },
})
const emit = defineEmits(['submitted'])

const model = ref(new Answer({ type: LANGUAGE_DEFAULT }))

function reset() {
  model.value = new Answer({ type: LANGUAGE_DEFAULT })
}

function submitForm() {
  emit('submitted', new Answer(model.value))
  reset()
}

watchEffect(() => {
  if (!answer) {
    return
  }

  model.value = new Answer(answer)
})
</script>

<template>
  <div class="wrapper">
    <h5 class="mb-3">
      <slot name="title"></slot>
    </h5>

    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          class="form-input w-full rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-100"
          v-model.trim="model.title"
        />
      </div>

      <div class="flex flex-col mb-3">
        <label for="answer">Answer</label>
        <beautify-area v-model="model.answer" :type="model.type"></beautify-area>
      </div>

      <div class="flex flex-col mb-3">
        <label for="note">Note</label>
        <textarea
          name="note"
          id="note"
          v-model="model.note"
          class="form-textarea rounded-md border border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-100"
        ></textarea>
      </div>

      <div class="flex justify-between items-end">
        <div class="flex flex-col">
          <label for="type">Type</label>
          <select
            name="type"
            id="type"
            class="form-select w-32 rounded-md border border-gray-300 focus:border-gray-400 focus:ring-gray-100"
            v-model="model.type"
          >
            <option value="plain" selected>Text</option>
            <option :value="type" v-for="[type, language] in Object.entries(LANGUAGES)">
              {{ language }}
            </option>
          </select>
        </div>

        <div class="buttons">
          <slot name="buttons">
            <button
              type="submit"
              class="rounded-md bg-blue-500 px-3 py-1 shadow-sm text-white hover:bg-blue-400"
            >
              <slot name="button">Submit</slot>
            </button>
          </slot>
        </div>
      </div>
    </form>
  </div>
</template>
