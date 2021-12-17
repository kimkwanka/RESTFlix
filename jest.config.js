/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^#components/(.*)$': '<rootDir>//src/components/$1',
    '^#redux/(.*)$': '<rootDir>/src/redux/$1',
    '^#hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^#views/(.*)$': '<rootDir>/src/views/$1',
    '\\.(css|scss)$': '<rootDir>/jest/style.mock.ts',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
};