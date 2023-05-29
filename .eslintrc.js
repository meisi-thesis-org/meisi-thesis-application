const path = require('path')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: path.resolve(__dirname, 'tsconfig.json')
  },
  rules: {
    'max-len': ['error', 80],
    semi: 'off',
    '@typescript-eslint/semi': 'off'
  }
}
