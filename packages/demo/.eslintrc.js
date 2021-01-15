module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended'
  ],
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-unused-vars': 'warn',
    'object-shorthand': 'warn',
    '@typescript-eslint/member-delimiter-style': 'off'
  }
}
