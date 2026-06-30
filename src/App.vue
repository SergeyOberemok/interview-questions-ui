<script setup>
import { RouterLink, RouterView } from 'vue-router'

const isDev = import.meta.env.DEV
document.title = import.meta.env.VITE_TITLE
</script>

<template>
  <header class="container mx-auto mb-5 py-4">
    <nav>
      <RouterLink to="/questions" class="me-8">Questions</RouterLink>
      <RouterLink to="/add-question" class="me-8">Add Question</RouterLink>

      <RouterLink to="/assessment" class="me-8">Assessment</RouterLink>

      <RouterLink to="/dev" v-if="isDev" class="me-8">Dev</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
