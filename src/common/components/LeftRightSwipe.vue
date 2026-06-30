<script setup>
import { usePointerSwipe } from '@vueuse/core'
import { computed, ref } from 'vue'

const container = ref(null)
const containerWidth = computed(() => container.value?.offsetWidth)
const target = ref(null)
const left = ref('0')
const opacity = ref(1)
const {
  direction,
  isSwiping,
  distanceX: lengthX,
} = usePointerSwipe(target, {
  onSwipe,
  onSwipeEnd,
})

const emit = defineEmits(['moved'])
defineExpose({ reset })

function onSwipe() {
  if (!containerWidth.value) {
    return
  }

  const length = lengthX.value * -1
  left.value = `${length}px`
  opacity.value = 1.1 - Math.abs(length) / containerWidth.value
}

function onSwipeEnd() {
  if (containerWidth.value && Math.abs(lengthX.value) / containerWidth.value >= 0.4) {
    left.value = `${(lengthX.value / lengthX.value) * 100}%`
    opacity.value = 0

    emit('moved', direction.value)
  } else {
    reset()
  }
}

function reset() {
  left.value = '0'
  opacity.value = 1
}
</script>

<template>
  <div>
    <div
      class="w-full h-full relative overflow-hidden select-none cursor-pointer flex justify-center items-center"
      ref="container"
    >
      <div
        class="w-full h-full flex justify-center items-center absolute top-0 left-0"
        ref="target"
        :class="{ 'transition-all duration-200 ease-linear': isSwiping }"
        :style="{ left, opacity }"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>
