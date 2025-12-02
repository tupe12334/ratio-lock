import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/ratio-lock/',
  resolve: {
    alias: [
      // Use built dist files to avoid module resolution issues
      {
        find: 'ratio-lock/react-hook-form',
        replacement: resolve(__dirname, '../dist/react-hook-form/index.js'),
      },
      {
        find: 'ratio-lock/react',
        replacement: resolve(__dirname, '../dist/react/index.js'),
      },
      {
        find: 'ratio-lock',
        replacement: resolve(__dirname, '../dist/index.js'),
      },
    ],
    dedupe: ['react', 'react-dom', 'react-hook-form'],
  },
})
