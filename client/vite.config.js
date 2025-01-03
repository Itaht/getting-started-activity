import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/getting-started-activity/' : '/', // Ensures the correct relative path for built files
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
  build: {
    outDir: 'dist', // Output directory for built files
    rollupOptions: {
      input: './index.html', // Ensure the correct input file
    },
    assetsInlineLimit: 0, // Inline all assets to prevent CSP issues
  },
});
