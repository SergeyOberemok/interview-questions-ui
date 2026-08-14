<script setup>
import ConnectionManager from '@/features/sockets/ConnectionManager.vue'
import ConnectionState from '@/features/sockets/ConnectionState.vue'
</script>

<template>
  <div>
    <h3 class="font-bold mb-2">Connection</h3>

    <div class="flex justify-between">
      <connection-state></connection-state>
      <connection-manager></connection-manager>
    </div>
  </div>
</template>
