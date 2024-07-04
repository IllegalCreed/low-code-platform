/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    // 针对cy测试文件eslint报错的配置
    {
      files: ['cypress/e2e/**/*.js','cypress/support/**/*.js','cypress/component/**/*.js'], // 指定 Cypress 测试文件夹的路径和文件
      globals: {
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        cy: 'readonly',
        Cypress: 'readonly'
      },
      env: {
        mocha: true // Cypress 基于 Mocha
      }
    }
  ]
}
