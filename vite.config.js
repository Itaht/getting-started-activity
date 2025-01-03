import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/getting-started-activity/' : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: './client/index.html', // Make sure this path is correct
    },
  },
  server: {
    port: 5173,
    open: true, // Auto-open the browser
  },
});
