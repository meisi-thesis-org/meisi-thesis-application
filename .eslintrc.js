module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.base.json'
  },
  rules: {
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
