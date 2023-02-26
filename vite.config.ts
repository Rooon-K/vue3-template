import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: { // 配置host
    host: "127.0.0.1",
    port: 3000
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "../daisy/src/assets/scss/globalMixin.scss";@import "../daisy/src/assets/scss/globalVar.scss"'
      }
    }
  }
})
