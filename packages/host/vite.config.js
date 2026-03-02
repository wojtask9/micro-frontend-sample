import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { federation } from '@module-federation/vite';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'host',
      filename: 'remoteEntry.js', // Entry point for the host's own remote modules
      dts: false,
      shared: {
        vue: {
          singleton: true,
        }
      }, // Ensure shared dependencies are listed
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
   //target: "esnext"
  },
  server: {
    port: 5020,
  },
  preview: {
    port: 5020,
  },
});
