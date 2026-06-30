<script setup>
import BeautifyArea from '@/common/components/BeautifyArea.vue'
import LanguageTypes from '@/common/components/LanguageTypes.vue'
import { LANGUAGE_DEFAULT } from '@/common/constants'
import { Answer } from '@/components/answers/models/answer.model'

const model = defineModel({ default: new Answer({ type: LANGUAGE_DEFAULT }) })
const emit = defineEmits(['submitted'])

function reset() {
  model.value = new Answer({ type: LANGUAGE_DEFAULT })
}

function submit() {
  emit('submitted')
  reset()
}
</script>

<template>
  <div>
    <h5 class="mb-4">
      <slot name="title"></slot>
    </h5>

    <form @submit.prevent="submit">
      <div class="mb-4">
        <label for="title">Title</label>
        <input type="text" id="title" class="w-full ctl" v-model.trim="model.title" />
      </div>

      <div class="flex flex-col mb-4">
        <label for="answer">Answer</label>
        <beautify-area v-model="model.detail" :type="model.type"></beautify-area>
      </div>

      <div class="flex flex-col mb-4">
        <label for="type">Type</label>
        <language-types v-model="model.type"></language-types>
      </div>

      <div class="flex flex-col mb-4">
        <label for="note">Note</label>
        <textarea name="note" id="note" v-model="model.note" class="ctl"></textarea>
      </div>

      <div class="buttons flex justify-end">
        <slot name="buttons"></slot>
      </div>
    </form>
  </div>
</template>
