/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from "@vitejs/plugin-react"
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/utils/setup.tsx'],
    coverage: {
      reportsDirectory: './coverage',
      enabled: true,
      provider: 'v8',
      clean: true,
      reporter: ['text', 'json', 'html'],
      include: ['app/**/*.{ts,tsx}'],
      exclude: ['app/**/*.d.ts', 'app/**/*.stories.{ts,tsx}'],
    },
    include: [
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
      'tests/integration/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['tests/e2e/**/*', 'tests/performance/**/*'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname),
    },
  },
});
