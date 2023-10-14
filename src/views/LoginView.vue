<script setup>
import { useAppStore } from '@/stores/app';
import router from '@/router';

const appStore = useAppStore();
const user = { email: '', password: '' };

const login = async (event) => {
  event.preventDefault();

  const result = await appStore.registerUser(user);

  if (result) {
    router.push('/');
  }
};
</script>

<template>
  <div class="container mx-auto self-center">
    <h4 class="mb-3 text-2xl font-light text-center">Login to your account</h4>

    <form @submit="login">
      <label for="login" class="mb-1 block text-gray-700">Login</label>
      <input
        type="text"
        id="login"
        class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-300 focus:ring-opacity-50"
        placeholder="Email"
        v-model="user.email"
      />
      <label for="passwoord" class="mb-1 block text-gray-700">Password</label>
      <input
        type="text"
        id="password"
        class="mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-300 focus:ring-opacity-50"
        placeholder="Password"
        v-model="user.password"
      />

      <button
        class="inline-block px-5 py-2 bg-green-600 text-white font-medium text-sm rounded shadow-md"
        type="submit"
      >
        Login
      </button>
    </form>
  </div>
</template>
