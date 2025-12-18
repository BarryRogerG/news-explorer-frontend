import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use base path only for production (GitHub Pages), use root for development
  const base = mode === 'production' ? '/news-explorer-frontend/' : '/'
  
  return {
    plugins: [react()],
    base,
  }
})
