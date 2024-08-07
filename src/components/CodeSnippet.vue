<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sass'

import { onMounted } from 'vue'

import { LANGUAGES } from '@/core/shared/constants'

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
  },
})

onMounted(() => {
  window.Prism = window.Prism || {}
  window.Prism.manual = true
  Prism.highlightAll()
})

function selectedLanguage() {
  return LANGUAGES[props.lang] || 'plain'
}
</script>

<template>
  <div class="wrapper rounded-lg overflow-hidden drop-shadow">
    <pre><code :class="`language-${selectedLanguage()}`">{{ text }}</code></pre>
  </div>
</template>

<style lang="scss">
pre[class*='language-'] {
  margin: 0 !important;
  padding: 1em 2em;
}
</style>
