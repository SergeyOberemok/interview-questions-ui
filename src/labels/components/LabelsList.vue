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
  <div class="wrapper flex">
    <fwb-badge v-for="(label, index) in labels" :key="index" class="me-1">
      <span>{{ label }}</span>

      <slot :index="index"></slot>
    </fwb-badge>
  </div>
</template>
