const baseConfig = require('../jest.config.js');

module.exports = {
  ...baseConfig,
  rootDir: '.',
  roots: ['<rootDir>/e2e'],
  testMatch: ['<rootDir>/e2e/**/*.test.ts'],
  globalSetup: '<rootDir>/../libs/testing/jest.setup.global.ts',
    moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',
    '^@libs/shared/(.*)$': '<rootDir>/../libs/shared/src/$1',
    '^@libs/shared$': '<rootDir>/../libs/shared/src/index',
    '^@libs/testing/(.*)$': '<rootDir>/../libs/testing/$1',
    '^@libs/testing$': '<rootDir>/../libs/testing/index'
  },
  reporters: [
    'default',
    '<rootDir>/../libs/testing/jest.seed.reporter.js'
  ]
};
