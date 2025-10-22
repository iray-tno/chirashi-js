import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
        exclude: [
            'node_modules/**',
            '.cache/**',
            'public/**',
            'coverage/**',
        ],
    },
});
