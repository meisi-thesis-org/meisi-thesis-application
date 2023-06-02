/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: ['<rootDir>/application/**/**/src/**/*.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'lcov', 'html'],
  projects: [
    {
      displayName: '@meisi-thesis/application-frontend',
      testEnvironment: 'js-dom',
      testMatch: ['<rootDir>/application/backend/**/src/**/*.spec.ts']
    },
    {
      displayName: '@meisi-thesis/application-backend',
      testEnvironment: 'node',
      preset: 'ts-jest',
      transform: { '^.+\\.ts?$': 'ts-jest' },
      testMatch: ['<rootDir>/application/backend/**/src/**/*.spec.ts']
    }
  ]
};
