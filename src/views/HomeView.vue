<script setup>
import CodeSnippet from '@/components/CodeSnippet.vue'

const jsSnippet = 'function hello() {\n' + '  console.log(Hello World)\n' + '}'
const sassSnippet = 'pre[class*="language-"] {}'
const htmlSnippet = '<html></html>'
</script>

<template>
  <div class="container mx-auto">
    <h1 class="mb-3">Main</h1>

    <CodeSnippet :text="jsSnippet" lang="js" />
  </div>
</template>
