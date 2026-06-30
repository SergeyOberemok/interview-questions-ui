<script setup>
import { useSocketConnectionStore } from '@/stores/socket-connection.store'

const socketConnectionStore = useSocketConnectionStore()

function connect() {
  socketConnectionStore.connect()
}

function disconnect() {
  socketConnectionStore.disconnect()
}
</script>

<template>
  <div class="flex">
    <button type="button" @click="connect()" class="me-2 cursor-pointer">Connect</button>
    <button type="button" @click="disconnect()" class="cursor-pointer">Disconnect</button>
  </div>
</template>
