<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/" class="me-1">Home</RouterLink>
      <RouterLink to="/about" class="me-1">About</RouterLink>
      <RouterLink to="/questions" class="me-1">Questions</RouterLink>
    </nav>
  </header>

  <HelloWorld msg="You did it!" />

  <main>
    <RouterView />
  </main>
</template>
