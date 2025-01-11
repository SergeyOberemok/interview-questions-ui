<script setup>
import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const search = ref('')
const emit = defineEmits(['changed'])

const searchTypeahead = debounce(() => {
  emit('changed', search.value)
}, 500)
</script>

<template>
  <div class="wrapper relative">
    <input
      type="text"
      id="search"
      placeholder="Search"
      class="form-input w-full pe-9 rounded-md border-gray-300 shadow-sm focus:border-gray-400 focus:ring-gray-100"
      v-model.trim="search"
      @input="searchTypeahead"
    />

    <div class="absolute top-1/2 end-3 -translate-y-1/2 flex">
      <slot name="right-icon"></slot>

      <x-mark-icon
        v-if="search?.length > 0"
        class="size-4 text-gray-500 cursor-pointer ms-1"
        @click="(search = '', emit('changed', ''))"
      ></x-mark-icon>
    </div>
  </div>
</template>
