<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="me-1">Home</RouterLink>
      <RouterLink to="/about" class="me-1">About</RouterLink>
      <RouterLink to="/questions" class="me-1">Questions</RouterLink>
    </nav>
  </header>

  <main>
    <RouterView />
  </main>
</template>
