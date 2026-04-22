import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': '/src',
    },
  },

  base: '/ieeecsuni.github.io/',

  server: {
    port: 5173,
    strictPort: true,

    proxy: {
      '/ieeecsuni.github.io/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ieeecsuni.github.io/, '') // Quita el prefijo para Laravel
      },
      '/ieeecsuni.github.io/login': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ieeecsuni.github.io/, '')
      },
      '/ieeecsuni.github.io/register': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ieeecsuni.github.io/, '')
      },
      '/ieeecsuni.github.io/logout': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ieeecsuni.github.io/, '')
      },
      '/ieeecsuni.github.io/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ieeecsuni.github.io/, '')
      },
    },
  },
})