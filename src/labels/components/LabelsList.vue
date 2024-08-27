<script setup>
import { FwbBadge } from 'flowbite-vue'

const props = defineProps({
  labels: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="wrapper flex flex-column">
    <fwb-badge v-for="(label, index) in labels" :key="index" class="me-1">{{ label }}</fwb-badge>
  </div>
</template>
