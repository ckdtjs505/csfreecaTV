import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'src/static'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/assets/js/main.js'),
      output: {
        entryFileNames: 'main.js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'styles.css';
          }
          return '[name][extname]';
        }
      }
    }
  }
});
