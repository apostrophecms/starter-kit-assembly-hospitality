import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@asset': path.resolve(__dirname, 'sites/modules/asset/ui/src'),
      '~normalize.css': path.resolve(__dirname, 'node_modules/normalize.css/normalize.css'),
      '~': path.resolve(__dirname, 'node_modules')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [
          path.resolve(__dirname, 'sites/modules'),
          path.resolve(__dirname, 'sites/modules/asset/ui/src/scss'),
          path.resolve(__dirname, 'node_modules')
        ],
        additionalData: `@use "sass:math"; @use "sass:color"; @import "variables";`
      }
    }
  },
  build: {
    sourcemap: true
  }
}); 