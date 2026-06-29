<script setup>
import SocketsConnectionManager from './SocketsConnectionManager.vue'
import SocketsConnectionState from './SocketsConnectionState.vue'
</script>

<template>
  <div class="flex justify-between gap-4">
    <sockets-connection-state></sockets-connection-state>
    <sockets-connection-manager></sockets-connection-manager>
  </div>
</template>
