<script setup>
import { RouterView } from 'vue-router';

import NavBar from '@/components/NavBar.vue';
</script>

<template>
  <header>
    <NavBar />
  </header>

  <main class="w-full h-full flex">
    <RouterView />
  </main>
</template>

<style></style>
