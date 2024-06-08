import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: 'node',
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.node.js',
    '**/?(*.)+(spec|test).node.[tj]s?(x)',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default config;
