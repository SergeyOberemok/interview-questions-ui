<script setup></script>

<template>
  <main>
    <div class="container mx-auto px-4">
      <h4 class="mb-3 text-2xl font-light text-center">
        Login to your account
      </h4>

      <form>
        <label for="login" class="mb-1 block text-gray-700">Login</label>
        <input
          type="text"
          id="login"
          class="mb-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          placeholder="Email"
        />
        <label for="passwoord" class="mb-1 block text-gray-700">Password</label>
        <input
          type="text"
          id="password"
          class="mt-1 mb-3 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          placeholder="Password"
        />

        <button
          type="button"
          class="inline-block px-5 py-2 bg-green-600 text-white font-medium text-sm rounded shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  </main>
</template>
