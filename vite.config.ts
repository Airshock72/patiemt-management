import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss()
  ]
  // base: '/patient-management/'
})
