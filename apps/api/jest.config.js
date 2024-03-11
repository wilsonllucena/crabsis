const { resolve } = require('path');
const root = resolve(__dirname);

module.exports = {
  preset: 'ts-jest',
  rootDir: root,
  displayName: 'tests:unit',
  testMatch: ['<rootDir>/test/**/*.spec.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/test/$1',
  },
};