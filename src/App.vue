<script setup>
import Header from '@/common/components/header/Header.vue'
import { RouterView } from 'vue-router'

document.title = import.meta.env.VITE_TITLE
</script>

<template>
  <Header />

  <main>
    <RouterView />
  </main>
</template>
