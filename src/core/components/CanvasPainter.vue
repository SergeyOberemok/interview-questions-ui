<script setup>
import { computed, onMounted, ref, useTemplateRef } from 'vue'

const canvas = useTemplateRef('canvas')
const ctx = computed(() => canvas.value.getContext('2d'))
const isPainting = ref(false)

onMounted(() => {
  ctx.value.lineWidth = 3
  ctx.value.strokeStyle = 'black'
  ctx.value.lineJoin = 'round'
  ctx.value.lineCap = 'round'
})

function startPainting(event) {
  isPainting.value = true
}

function stopPainting(event) {
  isPainting.value = false
  ctx.value.beginPath() // Reset path to avoid connecting lines
}

function draw(event) {
  ctx.value.lineTo(event.offsetX, event.offsetY)
  ctx.value.stroke()
}

function clear() {
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
}
</script>

<template>
  <div class="canvas-painter-wrapper">
    <canvas
      id="painter"
      class="border border-gray-500"
      @mousedown="startPainting"
      @mouseup="stopPainting"
      @mousemove="isPainting && draw($event)"
      ref="canvas"
    ></canvas>

    <button type="button" class="border border-gray-500 rounded-md shadow-sm px-3" @click="clear">
      Clear
    </button>
  </div>
</template>
