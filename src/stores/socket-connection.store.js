import { defineStore } from 'pinia'
import { ref } from 'vue'

import { socket } from '@/socket'

export const useSocketConnectionStore = defineStore('socketConnection', () => {
  const isConnected = ref(false)

  function bindEvents() {
    socket.on('connect', () => (isConnected.value = true))
    socket.on('disconnect', () => (isConnected.value = false))
  }

  function connect() {
    socket.connect()
  }

  function disconnect() {
    socket.disconnect()
  }

  return { isConnected, bindEvents, connect, disconnect }
})
