import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/ratio-lock/',
  resolve: {
    alias: [
      // More specific paths must come first
      {
        find: 'ratio-lock/react-hook-form',
        replacement: resolve(__dirname, '../src/react-hook-form/index.ts'),
      },
      {
        find: 'ratio-lock/react',
        replacement: resolve(__dirname, '../src/react/index.ts'),
      },
      {
        find: 'ratio-lock',
        replacement: resolve(__dirname, '../src/index.ts'),
      },
    ],
    // Ensure single instances of React and react-hook-form
    dedupe: ['react', 'react-dom', 'react-hook-form'],
  },
})
