import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      'apps/backend/src/**/*.test.ts',
      'apps/frontend/app/utils/**/*.test.ts',
    ],
  },
})
