<script setup>
import { RouterLink } from 'vue-router';
import HelloWorld from '@/components/HelloWorld.vue';
import { useAppStore } from '@/stores/app';
import router from '@/router';

const message = 'Interview Questions';

const appStore = useAppStore();

const logout = () => {
  appStore.resetUser();
  router.push('/login');
};
</script>

<template>
  <nav class="fixed w-full h-16 border-b-2 border-gray-100 bg-white">
    <div class="mx-auto h-full px-4 flex items-center">
      <HelloWorld :msg="message" />

      <div v-if="appStore.isAuth" class="px-4 mr-auto">
        <RouterLink to="/" class="mr-4">Home</RouterLink>
        <RouterLink to="/add-question" class="mr-4">Add Question</RouterLink>
        <RouterLink to="/about" class="mr-4">About</RouterLink>
      </div>

      <button v-if="appStore.isAuth" type="button" @click="logout" class="px-4">
        Logout
      </button>
    </div>
  </nav>
</template>
