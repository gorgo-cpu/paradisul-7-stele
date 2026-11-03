import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // GSAP + Motion + OGL form a single animation vendor bundle (~190 kB gzip).
    chunkSizeWarningLimit: 700,
  },
});
