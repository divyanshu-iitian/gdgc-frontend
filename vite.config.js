import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/gdgc-frontend/',  // GitHub Pages base URL
  server: {
    port: 3000,
    open: true
  }
})
