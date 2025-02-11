import eslintJs from '@eslint/js'
import globals from 'globals'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import tsEslint from 'typescript-eslint'

export default [
  eslintJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        FB: true,
        gapi: true,
        google: true
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        parser: '@typescript-eslint/parser'
      }
    },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react/react-in-jsx-scope': 'off',
      'no-mixed-spaces-and-tabs': 0,
      'react-hooks/exhaustive-deps': 'warn',
      semi: ['error', 'never', { beforeStatementContinuationChars: 'never' }],
      quotes: ['error', 'single'],
      'comma-dangle': [
        'error',
        {
          arrays: 'never',
          objects: 'never',
          imports: 'never',
          exports: 'never',
          functions: 'never'
        }
      ],
      'jsx-quotes': ['error', 'prefer-single'],
      indent: ['error', 2],
      'semi-style': ['error', 'last'],
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'no-console': ['error', { allow: ['warn', 'error', 'info'] }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  }
]
