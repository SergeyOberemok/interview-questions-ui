<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="wrapper">
    <h3>{{ msg }}</h3>
  </div>
</template>
