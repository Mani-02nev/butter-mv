import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom plugin to copy public dir except heavy video files (>50MB) to prevent disk space ENOSPC errors
function customPublicCopyPlugin() {
  return {
    name: 'custom-public-copy',
    apply: 'build',
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const distDir = path.resolve(__dirname, 'dist');

      function copyRecursive(src, dest) {
        if (!fs.existsSync(src)) return;
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);

          if (entry.isDirectory()) {
            // Create empty directory for movies
            if (entry.name === 'movies') {
              if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
            } else {
              copyRecursive(srcPath, destPath);
            }
          } else {
            // Skip files larger than 50MB during build copy
            const stat = fs.statSync(srcPath);
            if (stat.size < 50 * 1024 * 1024) {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        }
      }

      copyRecursive(publicDir, distDir);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), customPublicCopyPlugin()],
  build: {
    copyPublicDir: false, // Prevent Vite from duplicating 5.5GB video files into dist
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
});
