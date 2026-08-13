<script setup>
import NumberImage from '@/common/components/NumberImage.vue'
import SwipeForAnswer from '@/components/questions/components/inquery/SwipeForAnswer.vue'
</script>

<template>
  <div class="container mx-auto">
    <swipe-for-answer :question="'2+2'" :choices="[2, 3]" v-slot="slotProps">
      <number-image
        :number="slotProps.number"
        :is-revealed="isImagesStripped"
        class="h-48 flex justify-center items-center"
      ></number-image>
    </swipe-for-answer>
  </div>
</template>
