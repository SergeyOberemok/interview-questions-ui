<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const isDev = ref(import.meta.env.DEV)
</script>

<template>
  <header class="container mx-auto mb-5 py-3">
    <nav>
      <RouterLink to="/" class="me-10">Home</RouterLink>
      <RouterLink to="/about" class="me-10">About</RouterLink>
      <RouterLink to="/questions" class="me-10">Questions</RouterLink>
      <RouterLink to="/add-question" class="me-10">Add Question</RouterLink>

      <RouterLink to="/dev" v-if="isDev" class="me-10">Dev</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
