import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  build: {
    cssMinify: 'lightningcss',
    rolldownOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: 'phosphor-icons', test: '@phosphor-icons/react' },
            { name: 'react', test: /\/(react|react-dom)\// },
            { name: 'react-router', test: 'react-router' },
            { name: 'react-query', test: '@tanstack/react-query' },
            { name: 'styled-components', test: 'styled-components' },
          ],
        },
        dir: 'dist',
      },
      transform: {
        plugins: {
          styledComponents: {
            pure: true,
          },
        },
      },
    },
  },
  css: {
    transformer: 'lightningcss',
  },
  plugins: [react(), tailwindcss()],
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
    warmup: {
      clientFiles: [
        './src/components/dashboard/ProvinceSummaryGraph.tsx',
        './src/components/dashboard/ProvinceSummaryBar.tsx',
        './src/lib/echarts/bar.ts',
        './src/lib/echarts/graph.ts',
      ],
    },
  },
});
