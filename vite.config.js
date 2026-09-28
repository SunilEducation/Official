import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];

export default defineConfig({
  base: isGitHubActions && repoName ? `/${repoName}/` : '/',
  plugins: [react()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
      mangle: true,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
