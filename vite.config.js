import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/getting-started-activity/' : '/',
  server: {
    port: 5173, // เปลี่ยนพอร์ตเป็น 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: './client/index.html',
    },
  },
});
