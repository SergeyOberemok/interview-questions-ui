<script setup>
import SocketsConnection from '@/features/sockets/SocketsConnection.vue'
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const isDev = import.meta.env.DEV

const routeExtras = {
  assessment: SocketsConnection,
}

const route = useRoute()
const extraComponent = computed(() => routeExtras[route.name])
</script>

<template>
  <header class="container mx-auto h-16 flex items-center">
    <nav class="flex justify-between items-center w-full">
      <div>
        <RouterLink to="/questions" class="me-8" exact-active-class="font-bold"
          >Questions</RouterLink
        >
        <RouterLink to="/add-question" class="me-8" exact-active-class="font-bold">
          Add Question
        </RouterLink>
        <RouterLink to="/assessment" class="me-8" exact-active-class="font-bold"
          >Assessment</RouterLink
        >
        <RouterLink to="/dev" v-if="isDev" class="me-8" exact-active-class="font-bold"
          >Dev</RouterLink
        >
      </div>

      <component :is="extraComponent" v-if="extraComponent" />
    </nav>
  </header>
</template>
