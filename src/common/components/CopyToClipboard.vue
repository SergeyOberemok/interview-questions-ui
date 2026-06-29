<script setup>
import { ClipboardDocumentIcon } from '@heroicons/vue/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/solid'
import { useClipboard } from '@vueuse/core'

const { source } = defineProps({
  source: { type: String, required: true },
})

const { copy, copied, isSupported } = useClipboard({ source })
</script>

<template>
  <button v-if="isSupported" type="button" @click="copy(source)">
    <ClipboardDocumentIcon class="size-4 text-gray-700" :class="{ 'text-green-700': copied }" />
  </button>
  <template v-else>
    <ExclamationTriangleIcon class="size-4 text-red-100" />
  </template>
</template>
