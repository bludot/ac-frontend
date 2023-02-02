import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  root: 'src',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  server: {
    port: 8080,
  },
  plugins: [
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
  ]
});