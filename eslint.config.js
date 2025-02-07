export default {
  env: {
    es2017: true,
    commonjs: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['vitest'],
  extends: ['eslint:recommended', 'plugin:vitest/recommended'],
  ignorePatterns: [
    '**/*.snap.js',
    'node_modules'
  ],
  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser'
    },
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser'
    }
  ],
  rules: {
    eqeqeq: 'error',
    'no-useless-escape': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'no-self-assign': 'off',
    'no-undef': 'off'
  }
}
