<script setup>
import Assessment from '@/features/assessment/Assessment.vue'
import Connection from '@/features/sockets/Connection.vue'
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const socketConnectionStore = useSocketConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)

onMounted(() => {
  socketConnectionStore.bindEvents()
})
</script>

<template>
  <div class="container mx-auto">
    <connection></connection>
    <assessment v-if="isConnected"></assessment>
  </div>
</template>
