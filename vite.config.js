import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' },
  },
  build: {
    rollupOptions: {
      output: {
        // Split heavy, rarely-changing vendor code into its own cacheable
        // chunks so they download in parallel and survive app-code redeploys.
        // (@supabase/supabase-js is already code-split via dynamic import.)
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
        },
      },
    },
  },
})
