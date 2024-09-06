<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sass'
import { onMounted, onUpdated } from 'vue'

import { LANGUAGE_DEFAULT } from '@/core/constants'

const props = defineProps({
  lang: {
    type: String,
    default: LANGUAGE_DEFAULT,
  },
})

onMounted(() => highlight())
onUpdated(() => highlight())

function highlight() {
  window.Prism = window.Prism || {}
  window.Prism.manual = true
  Prism.highlightAll()
}
</script>

<template>
  <div class="wrapper rounded-lg overflow-hidden drop-shadow relative">
    <pre><code :class="`language-${lang}`"><slot></slot></code></pre>
  </div>
</template>

<style lang="scss">
pre[class*='language-'] {
  margin: 0 !important;
  padding: 1em 2em;
}
</style>
