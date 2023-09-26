import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://back.olrando.cn', // 你希望请求的后端服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // 可选，如果你的 API 路径不包含 '/api' 前缀，可以不设置
      },
    },
  },
})
