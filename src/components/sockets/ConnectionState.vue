<script setup>
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { storeToRefs } from 'pinia'

const socketConnectionStore = useSocketConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)
</script>

<template>
  <div>
    <p>State: {{ isConnected }}</p>
  </div>
</template>
