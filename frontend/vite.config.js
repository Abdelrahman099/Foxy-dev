import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    target: 'es2015',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'ui-vendor': ['styled-components'],
          'i18n-vendor': ['i18next', 'react-i18next'],
        },
      },
    },
  },
  
  // Add proper SPA handling for production
  server: {
    historyApiFallback: true,
  },
  
  // Ensure proper base path
  base: '/',
})
