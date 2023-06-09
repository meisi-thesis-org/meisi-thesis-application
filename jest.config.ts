export default {
  rootDir: './',
  coverageDirectory: '<rootDir>/coverage',
  collectCoverageFrom: [
    '<rootDir>/application/**/**/__tests__/**/**/*.ts'
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleFileExtensions: ['js', 'ts'],
  coverageReports: ['json', 'html'],
  projects: [
    {
      displayName: '@meisi-thesis/application-backend',
      testEnvironment: 'node',
      transform: { '^.+\\.ts?$': 'ts-jest' },
      testMatch: [
        '<rootDir>/application/backend/**/__tests__/**/**/*.spec.ts'
      ],
      preset: 'ts-jest'
    }
  ]
};
