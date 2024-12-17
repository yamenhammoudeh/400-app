import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@libsql/client'],
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      external: ['@libsql/client/web'],
    },
  },
});