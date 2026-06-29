<script setup>
import { onMounted } from 'vue'

const QUANTITY_MULTIPLIER = 5

const quantity = defineModel({ required: true, type: Number, default: QUANTITY_MULTIPLIER })

const range = Array.from(Array(5), (_, i) => (i + 1) * QUANTITY_MULTIPLIER)

onMounted(() => (quantity.value = range[0]))
</script>

<template>
  <div>
    <select class="ctl w-full" name="quantity" id="quantity" v-model="quantity">
      <option v-for="item in range" :key="item" :value="item">{{ item }}</option>
    </select>
  </div>
</template>
