import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures the correct relative path for built files
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
    assetsInlineLimit: 0, // Inline all assets to prevent CSP issues
  },
});
