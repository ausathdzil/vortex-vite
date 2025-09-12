import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // build: {
  //   rollupOptions: {
  //     output: {
  //       manualChunks: {
  //         echarts: ['echarts'],
  //       },
  //     },
  //   },
  // },
  plugins: [
    react({ plugins: [['@swc/plugin-styled-components', {}]] }),
    tailwindcss(),
  ],
  preview: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
  },
});
