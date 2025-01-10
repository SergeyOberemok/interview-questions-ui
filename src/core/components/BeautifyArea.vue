<script setup>
import { CursorArrowRaysIcon } from '@heroicons/vue/24/outline'
import { beautify } from '../utils/beautify.function'
import { computed } from 'vue'
import { BEAUTIFY_LANGUAGES } from '../constants'

const model = defineModel({
  required: true,
  type: String,
})
const { type } = defineProps({
  type: { type: String, default: 'js' },
})

const isActive = computed(() => BEAUTIFY_LANGUAGES.some((language) => language === type))

function change() {
  model.value = beautify(model.value, type)
}
</script>

<template>
  <div class="wrapper relative">
    <textarea
      class="form-textarea w-full rounded-md border-gray-300 focus:border-gray-400 focus:ring-gray-100"
      v-model.trim="model"
      rows="4"
    ></textarea>
    <button
      type="button"
      @click="change"
      class="absolute top-2 right-2"
      :class="{ hidden: !isActive }"
    >
      <cursor-arrow-rays-icon class="size-4"></cursor-arrow-rays-icon>
    </button>
  </div>
</template>
