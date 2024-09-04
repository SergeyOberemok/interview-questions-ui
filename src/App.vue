<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="container mx-auto mb-5 py-3">
    <nav>
      <RouterLink to="/" class="me-10">Home</RouterLink>
      <RouterLink to="/about" class="me-10">About</RouterLink>
      <RouterLink to="/questions" class="me-10">Questions</RouterLink>
      <RouterLink to="/add-question">Add Question</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
