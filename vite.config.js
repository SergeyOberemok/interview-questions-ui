import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'

const publicDir = fileURLToPath(new URL('./public', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const bypassAssets = env.BYPASS_ASSETS === 'true'

  return {
    plugins: [vue(), vueDevTools(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
        '/assets': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
          // Serve a local file from public/assets (if present) instead of proxying,
          // so mock images work in dev without the backend hosting real assets.
          ...(bypassAssets && {
            bypass: (req) => {
              if (existsSync(join(publicDir, req.url))) {
                return req.url
              }
            },
          }),
        },
      },
    },
  }
})
