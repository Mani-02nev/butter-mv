import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Custom plugin to copy the public dir into dist using hard links instead of
// byte copies. Hard links share the same inode as the source file, so they
// cost ~0 extra disk space and are effectively instant — this avoids the
// ENOSPC errors that duplicating ~1.4GB of video would otherwise cause on
// Vercel's build container, WITHOUT silently dropping any file (previously
// files >50MB were skipped, which broke playback for large video parts in
// production even though they worked fine locally via the dev server).
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
            // Create empty directory for raw movie uploads (gitignored, not needed in dist)
            if (entry.name === 'movies') {
              if (!fs.existsSync(destPath)) fs.mkdirSync(destPath, { recursive: true });
            } else {
              copyRecursive(srcPath, destPath);
            }
          } else {
            if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
            try {
              fs.linkSync(srcPath, destPath);
            } catch {
              // Fall back to a real copy if hard-linking isn't possible
              // (e.g. src and dist end up on different filesystems/volumes).
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
