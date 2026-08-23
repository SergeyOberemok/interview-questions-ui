<script setup>
import Assessment from '@/features/assessment/Assessment.vue'
import { useSocketsConnectionStore } from '@/stores/sockets-connection.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const socketConnectionStore = useSocketsConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)

onMounted(() => {
  socketConnectionStore.bindEvents()
})
</script>

<template>
  <div class="container mx-auto pb-8">
    <assessment v-if="isConnected"></assessment>
  </div>
</template>
