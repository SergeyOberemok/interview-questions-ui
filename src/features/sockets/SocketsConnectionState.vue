<script setup>
import { useSocketsConnectionStore } from '@/stores/sockets-connection.store'
import { storeToRefs } from 'pinia'

const socketsConnectionStore = useSocketsConnectionStore()
const { isConnected } = storeToRefs(socketsConnectionStore)
</script>

<template>
  <div class="flex items-center">
    <span>State: </span>
    <span
      :class="{
        'text-green-700': isConnected,
        'text-red-500': !isConnected,
      }"
      >{{ isConnected ? 'Connected' : 'Disconnected' }}</span
    >
  </div>
</template>
