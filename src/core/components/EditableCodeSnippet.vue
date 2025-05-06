<script setup>
import { onMounted, ref } from 'vue'

import { LANGUAGE_DEFAULT, LANGUAGES } from '@/core/constants'
import CodeSnippet from './CodeSnippet.vue'

const props = defineProps({
  lang: {
    type: String,
    default: LANGUAGE_DEFAULT,
  },
})

const type = ref(LANGUAGE_DEFAULT)

onMounted(() => (type.value = props.lang))
</script>

<template>
  <div class="editable-code-snippet-wrapper relative">
    <code-snippet :lang="type"><slot></slot></code-snippet>

    <div class="absolute top-4 right-4">
      <select
        name="type"
        id="type"
        class="border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-gray-400 text-xs py-1 bg-transparent"
        v-model="type"
      >
        <option value="plain" selected>Text</option>
        <option :value="value" v-for="[value, title] in Object.entries(LANGUAGES)">
          {{ title }}
        </option>
      </select>
    </div>
  </div>
</template>
