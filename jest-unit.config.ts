import type { Config } from 'jest'
import { defaults } from 'jest-config'

const config: Config = {
  verbose: true,
  modulePaths: ['<rootDir>/src', '<rootDir>/types'],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'ts',
    'd.ts',
    'js',
    'jsx',
  ],
  rootDir: '.',
  reporters: ['default'],
  setupFiles: ['<rootDir>/test/env/set-env-vars.ts'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      // required due to custom location of tsconfig.json configuration file
      // https://kulshekhar.github.io/ts-jest/docs/getting-started/options/tsconfig
      { tsconfig: './tsconfig/tsconfig.test.json' },
    ],
  },
}

export default config
