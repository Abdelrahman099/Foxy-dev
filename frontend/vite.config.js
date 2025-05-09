import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2015',
    outDir: 'dist',
  },
  
  // Add proper SPA handling for production
  server: {
    historyApiFallback: true,
  },
  
  // Ensure proper base path
  base: '/',
})
