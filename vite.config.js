import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // এইটা চেক করুন

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})