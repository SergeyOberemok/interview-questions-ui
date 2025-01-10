<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isDev = import.meta.env.DEV
document.title = import.meta.env.VITE_TITLE
</script>

<template>
  <header class="container mx-auto mb-5 py-3">
    <nav>
      <RouterLink to="/questions" class="me-10">Questions</RouterLink>
      <RouterLink to="/add-question" class="me-10">Add Question</RouterLink>

      <RouterLink to="/dev" v-if="isDev" class="me-10">Dev</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
