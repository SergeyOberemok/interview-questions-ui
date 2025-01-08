<script setup>
import Combobox from '@/core/components/Combobox.vue'
import { ref } from 'vue'

const emit = defineEmits(['created'])
const label = ref('')
</script>

<template>
  <div class="wrapper">
    <combobox
      v-model="label"
      :items="items"
      @search="search"
      @selected="((label = ''), emit('created', $event))"
      placeholder="New label"
    ></combobox>
  </div>
</template>
