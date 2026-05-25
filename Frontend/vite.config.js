import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  define: {
    'process.env': {},
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "next/navigation": path.resolve(__dirname, "./src/next-shim/navigation.jsx"),
      "next/link": path.resolve(__dirname, "./src/next-shim/link.jsx"),
      "next/image": path.resolve(__dirname, "./src/next-shim/image.jsx"),
      "next/font/google": path.resolve(__dirname, "./src/next-shim/font-google.jsx"),
      "geist/font/sans": path.resolve(__dirname, "./src/next-shim/geist.jsx"),
      "geist/font/mono": path.resolve(__dirname, "./src/next-shim/geist.jsx"),
      "next-seo": path.resolve(__dirname, "./src/next-shim/next-seo.jsx"),
    },
  },
})
