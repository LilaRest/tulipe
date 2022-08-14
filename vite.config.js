import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path');

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'vuethers',
      fileName: (format) => `vuethers.${format == "iife" ? "min" : format}.js`,
      formats: ["es", "umd", "iife"]
    },
    rollupOptions: {
      external: ['vue', 'ethers'],
      output: {
        globals: {
            vue: 'Vue',
            ethers: 'Ethers',
        },
      },
    },
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
  ],
})

