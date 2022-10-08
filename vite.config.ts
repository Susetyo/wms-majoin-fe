import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import dotenv from 'dotenv';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  resolve:{
    alias:[
      {find:'@', replacement: path.resolve(__dirname,'src')},
      { find: /^~/, replacement: '' }
    ]
  }
})