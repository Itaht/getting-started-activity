import { defineConfig } from 'vite';

export default defineConfig({
  envDir: '../',
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // Match your server
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
