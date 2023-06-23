module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    project: ['./tsconfig/tsconfig.eslint.json'],
  },
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    webextensions: true,
  },
  plugins: [
    /* typescript-eslint */
    '@typescript-eslint',
    /* prettier */
    'prettier',
    /* unused-imports */
    'unused-imports',
    /* import */
    'import',
    /* promise */
    'promise',
  ],
  extends: [
    /* typescript-eslint */
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    /* airbnb */
    'airbnb-base',
    'airbnb-typescript/base',
    /* import */
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/recommended',
    /* promise */
    'plugin:promise/recommended',
    /* eslint-plugin-n */
    'plugin:n/recommended',
    /* eslint-config-standard-with-typescript */
    'standard-with-typescript',
    /* prettier */
    'prettier',
    'prettier/prettier',
    'plugin:prettier/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        resolvePaths: [__dirname],
      },
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
        // use an array of glob patterns
        project: ['./tsconfig/tsconfig.eslint.json'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  rules: {
    'no-restricted-globals': 'off',
    'no-underscore-dangle': ['error', { allow: ['__BROWSER_GLOBAL__'] }],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': 'error',
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'no-console': 'off',
    'no-alert': 'off',
    'n/no-missing-import': [
      'off',
      {
        allowModules: [],
        resolvePaths: [__dirname],
      },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
}
