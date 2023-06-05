export default {
  coverageProvider: 'v8',
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/application/**/**/src/**/*.ts'
  ],
  coverageReports: ['json', 'lcov', 'html'],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  projects: [
    {
      displayName: '@meisi-thesis/application-backend',
      testEnvironment: 'node',
      transform: {
        '^.+\\.ts?$': 'ts-jest'
      },
      testMatch: [
        '<rootDir>/application/backend/**/__tests__/**/*.spec.ts'
      ],
      testPathIgnorePatterns: [
        '<rootDir>/application/backend/**/dist'
      ]
    },
    {
      displayName: '@meisi-thesis/application-frontend',
      testEnvironment: 'jsdom'
    }
  ]
}
