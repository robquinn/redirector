import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  displayName: 'redirector integration tests',
  verbose: true,
  preset: 'ts-jest',
  modulePaths: ['<rootDir>/src', '<rootDir>/types'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleFileExtensions: [...defaults.moduleFileExtensions, '.ts', '.d.ts'],
  rootDir: '.',
  globalSetup: '<rootDir>/test/setup/global-setup.ts',
  globalTeardown: '<rootDir>/test/setup/global-teardown.ts',
  testEnvironment: '<rootDir>/test/env/puppeteer-environment.ts',
  reporters: ['default'],
  setupFiles: ['<rootDir>/test/env/set-env-vars.ts'],
}

export default config
