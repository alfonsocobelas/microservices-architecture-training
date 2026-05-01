/* eslint-disable no-undef */
module.exports = {
  default: {
    paths: ['tests/infrastructure/entrypoints/features/**/*.feature'],
    require: [
      'tests/infrastructure/entrypoints/step-definitions/**/*.ts',
      '../../libs/testing/entrypoints/step-definitions/shared/common.steps.ts'
    ],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    format: ['progress', 'summary'],
    timeout: 10000
  },
  operationsMsNestjs: {
    paths: ['tests/infrastructure/entrypoints/features/**/*.feature'],
    require: [
      'tests/infrastructure/entrypoints/step-definitions/**/*.ts',
      '../../libs/testing/entrypoints/step-definitions/shared/common.steps.ts'
    ],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    format: ['progress', 'summary'],
    timeout: 10000
  },
  ci: {
    paths: ['tests/infrastructure/entrypoints/features/**/*.feature'],
    require: [
      'tests/infrastructure/entrypoints/step-definitions/**/*.ts',
      '../../libs/testing/entrypoints/step-definitions/shared/common.steps.ts'
    ],
    requireModule: ['ts-node/register', 'tsconfig-paths/register'],
    format: ['json:reports/cucumber-report.json'],
    failFast: true,
    timeout: 20000
  }
}
