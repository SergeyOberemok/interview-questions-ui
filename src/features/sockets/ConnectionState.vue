<script setup>
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { storeToRefs } from 'pinia'

const socketConnectionStore = useSocketConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)
</script>

<template>
  <div>
    <p>
      <span>State: </span>
      <span
        :class="{
          'text-green-700': isConnected,
          'text-red-500': !isConnected,
        }"
        >{{ isConnected ? 'Connected' : 'Disconnected' }}</span
      >
    </p>
  </div>
</template>
