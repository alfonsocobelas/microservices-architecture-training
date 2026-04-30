const baseConfig = require('../../jest.config.js');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  roots: ['<rootDir>/tests'],
  testMatch: ['<rootDir>/tests/infrastructure/**/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/../../tests/'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest-setup-integration.ts'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@libs/shared/(.*)$': '<rootDir>/../../libs/shared/src/$1',
    '^@libs/shared$': '<rootDir>/../../libs/shared/src/index',
    '^@libs/testing/(.*)$': '<rootDir>/../../libs/testing/$1',
    '^@libs/testing$': '<rootDir>/../../libs/testing/index'
  },
  globalSetup: '<rootDir>/../../libs/testing/jest.setup.global.ts',
  reporters: [
    'default',
    '<rootDir>/../../libs/testing/jest.seed.reporter.js'
  ],
};
