<script setup>
import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-sass'
import { onMounted, onUpdated, watch } from 'vue'

import { LANGUAGE_DEFAULT } from '@/core/constants'

const props = defineProps({
  lang: {
    type: String,
    default: LANGUAGE_DEFAULT,
  },
  value: String,
})

onMounted(highlight)
onUpdated(highlight)

function highlight() {
  window.Prism = window.Prism || {}
  window.Prism.manual = true
  Prism.highlightAll()
}

watch(() => props.value, highlight)
</script>

<template>
  <div class="code-snippet-wrapper rounded-lg overflow-hidden drop-shadow relative">
    <pre><code :class="`language-${lang}`"><slot>{{ value }}</slot></code></pre>
  </div>
</template>

<style lang="scss">
pre[class*='language-'] {
  margin: 0 !important;
  padding: 1em 2em;
}
</style>
