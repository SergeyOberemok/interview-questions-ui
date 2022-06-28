<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="greetings">
    <h1 class="text-3xl font-ligh">{{ msg }}</h1>
  </div>
</template>
