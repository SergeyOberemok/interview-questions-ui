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
  <div class="labels-list-wrapper flex">
    <fwb-badge v-for="(label, index) in labels" :key="label.name" class="me-1">
      <span>{{ label.name }}</span>

      <slot :index="index"></slot>
    </fwb-badge>
  </div>
</template>
