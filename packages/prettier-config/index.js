/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 100,
  plugins: ['prettier-plugin-tailwindcss'],
  tailwindConfig: '@repo/tailwind-config/tailwind.config.js',
  bracketSpacing: true,
  endOfLine: 'lf',
  arrowParens: 'always',
}