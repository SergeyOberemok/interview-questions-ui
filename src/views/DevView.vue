<script setup>
import LanguageTypes from '@/common/components/LanguageTypes.vue'
import { ref } from 'vue'

const languageType = ref('')
</script>

<template>
  <div class="container mx-auto">
    <language-types v-model="languageType"></language-types>

    <div class="mt-4">Selected language type: {{ languageType }}</div>
  </div>
</template>
