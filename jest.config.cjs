module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/**/*.test.js'],
  transform: {},
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.html',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  verbose: true,
};
