<script setup>
import { usePointerSwipe } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'

const containerRef = useTemplateRef('containerRef')
const containerWidth = computed(() => containerRef.value?.offsetWidth)
const targetRef = useTemplateRef('targetRef')
const left = ref('0')
const opacity = ref(1)
const {
  direction,
  isSwiping,
  distanceX: lengthX,
} = usePointerSwipe(targetRef, {
  onSwipe,
  onSwipeEnd,
})

const { isHighlighted, isCorrectChosen } = defineProps({
  isHighlighted: Boolean,
  isCorrectChosen: Boolean,
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
  <div
    class="w-full min-h-24 relative overflow-hidden select-none cursor-pointer flex justify-center items-center pb-2"
    ref="containerRef"
  >
    <div
      ref="targetRef"
      class="card w-full flex justify-center items-center absolute top-0 left-0 bottom-2"
      :class="{
        'transition-all duration-200 ease-linear': isSwiping,
        'card-success': isHighlighted && isCorrectChosen,
        'card-danger': isHighlighted && !isCorrectChosen,
      }"
      :style="{ left, opacity }"
    >
      <slot>Content</slot>
    </div>
  </div>
</template>
