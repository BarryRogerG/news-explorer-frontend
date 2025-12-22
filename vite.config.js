import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // For GitHub Pages, use repository name as base path
  // For Vercel/Netlify, use root path '/'
  // You can override with VITE_BASE_PATH environment variable
  const base = process.env.VITE_BASE_PATH || (mode === 'production' ? '/news-explorer-frontend/' : '/')
  
  return {
    plugins: [react()],
    base,
  }
})
