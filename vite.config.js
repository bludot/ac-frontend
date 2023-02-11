import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mockServer from 'vite-plugin-mock-server'
import { viteStaticCopy } from 'vite-plugin-static-copy'

require('dotenv').config()

const configName = process.env.APP_CONFIG || process.env.NODE_ENV || 'development'
export default defineConfig({
  define: {
    global: 'window',
  },
  root: 'src',
  build: {
    // Relative to the root
    outDir: '../dist',
  },
  server: {
    port: 8080,
    proxy: {
      "/config.json": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => `config/static/${configName}/index.json`,
      },
    },
  },
  assetsInclude: [`./src/config/static/${configName}/index.json`],
  
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: `config/static/${configName}/index.json`,
          dest: 'config.json',
          rename: (fileName,
            fileExtension,
            fullPath) => {
              return '../config.json'
          }
        }
      ]
    }),
    react({
      // Use React plugin in all *.jsx and *.tsx files
      include: '**/*.{jsx,tsx}',
    }),
    mockServer({
      logLevel: 'info',
      urlPrefixes: [ '/backend/' ],
    })
  ]
});