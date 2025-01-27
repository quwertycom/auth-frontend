/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/utils/setup.tsx'],
    css: true,
    coverage: {
      reportsDirectory: './tests/coverage',
      enabled: true,
      provider: 'v8',
      clean: true,
      reporter: ['text', 'json', 'html'],
      include: [
        'app/**/*.{ts,tsx}',
        'components/**/*.{ts,tsx}',
        'lib/**/*.{ts,tsx}',
        'store/**/*.{ts,tsx}',
      ],
      exclude: [
        'app/**/*.d.ts',
        'app/**/*.stories.{ts,tsx}',
        'app/api/**/*',
        'tests/**/*',
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
      ],
      all: true,
    },
    include: [
      'tests/unit/**/*.{test,spec}.{ts,tsx}',
      'tests/integration/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: ['tests/e2e/**/*', 'tests/performance/**/*'],
    environmentOptions: {
      jsdom: {
        resources: 'usable',
        runScripts: 'dangerously',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('.', import.meta.url)),
    },
  },
});
