/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), process.env.mode !== 'test' && eslint()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/config/setupTests.ts',
    css: true,
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    coverage: {
      provider: 'v8',
      enabled: true,
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/vite-env.d.ts',
        '**/node_modules/**',
        '**/dist/**',
        '**/cypress/**',
        '**/.{idea,git,cache,output,temp}/**',
        'src/__tests__/mocks/**',
        'src/interfaces/**',
        'src/config/**',
        'src/constants.ts',
        'src/main.tsx',
        'src/routes.tsx',
      ],
    },
  },
});
