/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

const { pathsToModuleNameMapper } = require('ts-jest')
// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^#components/(.*)$': '<rootDir>//src/components/$1',
    '^#redux/(.*)$': '<rootDir>/src/redux/$1',
    '^#hooks/(.*)$': '<rootDir>//src/hooks/$1',
    '^#views/(.*)$': '<rootDir>//src/views/$1',
    "\\.(css|scss)$": "<rootDir>/jest/style.mock.ts"
  },
};