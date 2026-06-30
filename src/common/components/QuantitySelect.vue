<script setup>
const QUANTITY_MULTIPLIER = 5

const quantity = defineModel({ required: true, type: Number, default: QUANTITY_MULTIPLIER })

const range = Array.from(Array(5), (_, i) => (i + 1) * QUANTITY_MULTIPLIER)
</script>

<template>
  <div>
    <select class="ctl w-full px-2 py-1" name="quantity" id="quantity" v-model="quantity">
      <option v-for="item in range" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
