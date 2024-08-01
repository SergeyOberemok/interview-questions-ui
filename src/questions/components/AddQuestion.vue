<script setup>
import { ref } from 'vue'

const description = ref('')
const answer = ref('')
const notes = ref('')
const label = ref('')

const emit = defineEmits(['added'])

async function formSubmit(event) {
  const body = {
    description: description.value,
    answers: [answer.value],
    notes: notes.value,
    labels: [label.value],
  }

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }

  const response = await fetch('/api/questions', options)
  const data = await response.json()

  event.target.reset()
  emit('added')
}
</script>

<template>
  <div class="wrapper">
    <form class="flex flex-col" @submit.prevent="formSubmit">
      <div class="mb-3">
        <label for="description">Description</label>
        <input
          type="text"
          id="description"
          placeholder="Description"
          class="form-input w-full rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="description"
        />
      </div>

      <div class="mb-3">
        <label for="answer">Answers</label>
        <textarea
          name="answer"
          id="answer"
          placeholder="Answer"
          class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="answer"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="notes">Notes</label>
        <textarea
          name="notes"
          id="notes"
          placeholder="Notes"
          class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="notes"
        ></textarea>
      </div>

      <div class="mb-3">
        <label for="label">Labes</label>
        <input
          type="text"
          placeholder="Label"
          class="form-input w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-200"
          v-model.trim="label"
        />
      </div>

      <button
        type="submit"
        class="rounded-md bg-blue-500 p-1 shadow-sm text-white hover:bg-blue-400"
      >
        Submit
      </button>
    </form>
  </div>
</template>
