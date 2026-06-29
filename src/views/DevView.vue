<script setup>
import SwipeForImageAnswer from '@/features/inqueries/swipe-for-answer/SwipeForImageAnswer.vue'
</script>

<template>
  <div class="container mx-auto">
    <swipe-for-image-answer :question="'2 + 2'" :goal="4"></swipe-for-image-answer>
  </div>
</template>
