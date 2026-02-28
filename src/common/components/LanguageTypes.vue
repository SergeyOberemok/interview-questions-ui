<script setup>
import { LANGUAGES, LANGUAGE_DEFAULT } from '@/common/constants';
import { FwbButton } from 'flowbite-vue';

const model = defineModel({ default: LANGUAGE_DEFAULT })
</script>

<template>
  <div class="flex">
    <fwb-button
      v-for="[type, language] in [...Object.entries(LANGUAGES), ['plain', 'Text']]"
      type="button"
      :key="type"
      @click="model = type"
      size="sm"
      color="default"
      :outline="model !== type"
      class="me-1"
    >
      {{ language }}
    </fwb-button>
  </div>
</template>
