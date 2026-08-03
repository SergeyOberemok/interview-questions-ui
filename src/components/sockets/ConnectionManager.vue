<script setup>
import { useSocketConnectionStore } from '@/stores/socket-connection.store'
import { storeToRefs } from 'pinia'

const socketConnectionStore = useSocketConnectionStore()
const { isConnected } = storeToRefs(socketConnectionStore)

function connect() {
  socketConnectionStore.connect()
}

function disconnect() {
  socketConnectionStore.disconnect()
}
</script>

<template>
  <div class="flex">
    <button v-if="!isConnected" type="button" @click="connect()" class="btn">Connect</button>
    <button v-else type="button" @click="disconnect()" class="btn">Disconnect</button>
  </div>
</template>
