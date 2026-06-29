<script setup>
import { computed } from 'vue'
import { createInqueryComponent } from './inquery-component.factory.js'

const { type, args } = defineProps(['type', 'args'])
const currentComponent = computed(() => createInqueryComponent(type))
</script>

<template>
  <component :is="currentComponent" v-bind="args" />
</template>
