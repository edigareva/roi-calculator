import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Served from https://<user>.github.io/roi-calculator/ on GitHub Pages.
  base: '/roi-calculator/',
  plugins: [react()],
})
