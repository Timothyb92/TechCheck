import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        //svgr opts
      },
    }),
  ],
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://192.168.5.230:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
