import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    // eslint-plugin-react is here for exactly one rule: jsx-uses-vars. Without
    // it ESLint cannot see that JSX consumes an identifier, so anything used
    // only inside markup reads as unused — which produced a standing false
    // positive that trained everyone to ignore the linter, and real unused
    // code then hides behind the noise.
    //
    // Deliberately NOT the plugin's recommended set. That turns on 22 rules and
    // raises 85 mostly-stylistic errors on this codebase, which trades one
    // false positive for a wall of them. The point here is a linter worth
    // reading, not a style overhaul.
    plugins: { react },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
      'react/jsx-uses-vars': 'error',
    },
  },
])
