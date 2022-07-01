<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import { useAppStore } from './stores/app';

const message = 'Interview Questions';

const appStore = useAppStore();
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld :msg="message" />

      <nav v-if="appStore.isAuth">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style></style>
