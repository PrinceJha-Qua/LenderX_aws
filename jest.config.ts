import type { Config } from 'jest';

const config: Config = {
  // Use ts-jest to run TypeScript tests directly
  preset: 'ts-jest',
  testEnvironment: 'node',

  // Root directories
  roots: ['<rootDir>/tests', '<rootDir>/backend/src'],

  // Module resolution
  moduleNameMapper: {
    '^@backend/(.*)$': '<rootDir>/backend/src/$1',
    '^@lib/(.*)$': '<rootDir>/backend/src/lib/$1',
  },

  // Test file patterns
  testMatch: [
    '**/tests/**/*.test.ts',
    '**/tests/**/*.spec.ts',
  ],

  // Coverage configuration
  collectCoverageFrom: [
    'backend/src/**/*.ts',
    '!backend/src/**/*.d.ts',
    '!backend/src/**/index.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'text-summary', 'lcov', 'json-summary'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 75,
      lines: 80,
      statements: 80,
    },
  },

  // Test result output for CI
  reporters: [
    'default',
    ['jest-junit', {
      outputDirectory: 'test-results',
      outputName: 'junit.xml',
    }],
  ],

  // Performance
  maxWorkers: '50%',

  // Setup
  setupFilesAfterEnv: [],

  // Timeout — AI pipeline tests may take longer
  testTimeout: 30000,

  // Verbose output for sprint reviews
  verbose: true,
};

export default config;
