module.exports = {
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  env: {
    browser: true,
    es2021: true
  },
  plugins: ['react'],
  extends: ['plugin:react/recommended', 'standard-with-typescript', 'next/core-web-vitals'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/comma-dangle': ['off'],
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/semi': ['off'],
    '@typescript-eslint/quotes': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/space-before-function-paren': ['off'],
    '@typescript-eslint/indent': ['off'],
    '@typescript-eslint/member-delimiter-style': ['off'],
    '@typescript-eslint/unbound-method': ['off'],
    'multiline-ternary': 'off'
  }
};
