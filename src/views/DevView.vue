<script setup>
import BeautifyArea from '@/core/components/BeautifyArea.vue'
import { ref, watchEffect } from 'vue'

const model = ref('')

watchEffect(() => console.log(model.value))
</script>

<template>
  <div class="wrapper container mx-auto">
    <beautify-area v-model="model"></beautify-area>
  </div>
</template>
