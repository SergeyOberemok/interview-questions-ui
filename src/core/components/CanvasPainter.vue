<script setup>
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue'

const canvas = useTemplateRef('canvas')
const ctx = computed(() => canvas.value.getContext('2d'))
const isPainting = ref(false)

const model = defineModel({ type: String })

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

  model.value = ''
}

function drawModel() {
  const image = new Image()
  image.onload = () => ctx.value.drawImage(image, 0, 0)
  image.src = model.value
}

watch(isPainting, (isPainting) => {
  if (isPainting) {
    return
  }

  model.value = canvas.value.toDataURL()
})
watch(model, (image) => image && drawModel(), { once: true })
</script>

<template>
  <div class="canvas-painter-wrapper">
    <canvas
      id="painter"
      class="border border-gray-300 rounded-md shadow-sm"
      @mousedown="startPainting"
      @mouseup="stopPainting"
      @mousemove="isPainting && draw($event)"
      ref="canvas"
    ></canvas>

    <button type="button" class="border border-gray-300 rounded-md shadow-sm px-3" @click="clear">
      Clear
    </button>
  </div>
</template>
