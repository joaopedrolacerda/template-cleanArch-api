/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "babel",
  moduleNameMapper: {
    '@/tests/(.+)': '<rootDir>/tests/src/$1',
    '@/(.+)': '<rootDir>/src/$1'
  },
  roots: [
    "<rootDir>/src",
    "<rootDir>/tests"
  ],

  transform: {
    '\\.ts$': 'ts-jest'
  },
};
