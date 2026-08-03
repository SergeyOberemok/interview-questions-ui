<script setup>
import Assessment from '@/components/assessment/Assessment.vue'
import Connection from '@/components/sockets/Connection.vue'
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { onMounted } from 'vue'

const socketConnectionStore = useSocketConnectionStore()

onMounted(() => {
  socketConnectionStore.bindEvents()
})
</script>

<template>
  <div class="container mx-auto">
    <connection></connection>
    <assessment></assessment>
  </div>
</template>
