/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/assets/js'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
    moduleNameMapper: {
        '^@component/(.*)$': '<rootDir>/assets/js/app/components/$1',
        '^@app/(.*)$': '<rootDir>/assets/js/app/$1',
        '^@libs/(.*)$': '<rootDir>/assets/js/libs/$1',
    },
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    collectCoverageFrom: [
        'assets/js/**/*.{ts,tsx}',
        '!assets/js/**/*.d.ts',
        '!assets/js/**/__tests__/**',
    ],
    coverageDirectory: 'coverage',
    verbose: true,
};
