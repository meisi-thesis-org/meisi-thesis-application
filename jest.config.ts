export default {
  rootDir: './',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/application/**/**/__tests__/**/**/*.ts'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'ts'],
  coverageReporters: ['json', 'html'],
  projects: [
    {
      displayName: '@meisi-thesis/application-backend',
      testEnvironment: 'node',
      transform: { '^.+\\.ts?$': 'ts-jest' },
      testMatch: [
        '<rootDir>/application/backend/**/__tests__/**/**/*.spec.ts'
      ],
      preset: 'ts-jest'
    },
    {
      displayName: '@meisi-thesis/application-frontend',
      testEnvironment: 'node',
      transform: { '^.+\\.ts?$': 'jest-preset-angular' },
      testMatch: [
        '<rootDir>/application/frontend/src/**/**/*.spec.ts'
      ],
      preset: 'jest-preset-angular',
      setupFilesAfterEnv: ['<rootDir>/application/frontend/setup-jest.ts'],
      globalSetup: 'jest-preset-angular/global-setup'
    }
  ]
};
