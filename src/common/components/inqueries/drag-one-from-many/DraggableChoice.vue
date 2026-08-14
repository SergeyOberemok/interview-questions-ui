<script setup>
import { useDraggable, useElementBounding } from '@vueuse/core'
import { nextTick, onMounted, useTemplateRef } from 'vue'

const { index } = defineProps({ index: { type: Number, default: 0 } })

const element = useTemplateRef('element')
const { width, top } = useElementBounding(element)
const { x, y, style } = useDraggable(element)

onMounted(async () => {
  await nextTick()

  x.value = index * width.value + index * 16
  y.value = top.value
})
</script>

<template>
  <div ref="element" :style="style" class="absolute">
    <slot></slot>
  </div>
</template>
