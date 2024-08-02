/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@peace-net/eslint-config/hono.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
