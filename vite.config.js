import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'Vuethers',
      fileName: (format) => `vuethers.${format == "iife" ? "min" : format}.js`,
      formats: ["es", "umd", "iife"]
    },
    rollupOptions: {
      external: ['vue', 'ethers'],
      output: {
        globals: {
            vue: 'vue',
            ethers: 'ethers',
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
