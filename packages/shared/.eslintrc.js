/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@peace-net/eslint-config/library'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
}
