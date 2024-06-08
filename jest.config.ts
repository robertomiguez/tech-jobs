import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  projects: ['<rootDir>/jest.jsdom.config.ts', '<rootDir>/jest.node.config.ts'],
  detectOpenHandles: true,
  verbose: true,
  testTimeout: 30000,
};

export default config;
