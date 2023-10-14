<script setup>
import QuestionsList from '@/components/QuestionsList.vue';
</script>

<template>
  <Suspense>
    <template #default>
      <div class="container mx-auto mt-20">
        <QuestionsList />
      </div>
    </template>

    <template #fallback>
      <div class="container mx-auto self-center">Loading</div>
    </template>
  </Suspense>
</template>
