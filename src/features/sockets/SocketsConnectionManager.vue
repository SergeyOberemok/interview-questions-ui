<script setup>
import { useSocketsConnectionStore } from '@/stores/sockets-connection.store'
import { storeToRefs } from 'pinia'

const socketsConnectionStore = useSocketsConnectionStore()
const { isConnected } = storeToRefs(socketsConnectionStore)

function connect() {
  socketsConnectionStore.connect()
}

function disconnect() {
  socketsConnectionStore.disconnect()
}
</script>

<template>
  <div class="flex">
    <button v-if="!isConnected" type="button" @click="connect()" class="btn">Connect</button>
    <button v-else type="button" @click="disconnect()" class="btn">Disconnect</button>
  </div>
</template>
