<script setup>
import { debounce } from 'lodash-es'
import { computed, ref } from 'vue'
import { XMarkIcon } from '@heroicons/vue/16/solid'

const model = defineModel({ type: String })
const { items } = defineProps({
  items: { type: Array },
  placeholder: { type: String },
})
const emit = defineEmits(['search', 'selected'])

const isSearching = ref(false)
const isActive = computed(() => items?.length > 0 && isSearching.value === true)

const typeahead = debounce(() => ((isSearching.value = true), emit('search', model.value)), 500)

function emitSelected(item) {
  model.value = item
  isSearching.value = false
  emit('selected', item)
}
</script>

<template>
  <div class="wrapper relative">
    <div class="relative">
      <input
        class="form-input w-full pe-9 border-gray-300 rounded-md shadow-sm text-sm focus:border-gray-400 focus:ring-gray-100"
        type="text"
        v-model.trim="model"
        :placeholder="placeholder"
        @input="typeahead"
        v-on:keydown.enter.prevent="emitSelected(model)"
      />

      <div class="absolute top-1/2 end-3 -translate-y-1/2 flex">
        <slot name="right-icon"></slot>

        <x-mark-icon
          v-if="model?.length > 0"
          class="size-4 text-gray-500 cursor-pointer ms-1"
          @click="model = ''"
        ></x-mark-icon>
      </div>
    </div>

    <div
      class="w-full max-h-72 mt-1 p-1 absolute z-50 bg-white border border-gray-300 rounded-md overflow-hidden overflow-y-auto"
      :class="{ block: isActive, hidden: !isActive }"
    >
      <div
        v-for="(item, index) in items"
        :key="item"
        class="w-full py-2 px-3 text-sm text-gray-800 hover:bg-gray-50 rounded-md focus:outline-none focus:bg-gray-100 cursor-pointer"
        :tabindex="index"
        @click="emitSelected(item)"
      >
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>
