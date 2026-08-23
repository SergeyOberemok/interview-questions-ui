<script setup>
import LeftRightSwipe from '@/common/components/inqueries/left-right-swipe/LeftRightSwipe.vue'
import ExpressionImage from '@/common/components/number-image/ExpressionImage.vue'
</script>

<template>
  <div class="container mx-auto">
    <!-- <swipe-for-image-answer :question="'2 + 2'" :goal="2"></swipe-for-image-answer> -->
    <left-right-swipe>
      <expression-image :expression="'2 + 2'"></expression-image>
    </left-right-swipe>
  </div>
</template>
