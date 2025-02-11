import eslintJs from '@eslint/js'
import globals from 'globals'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import reactPlugin from 'eslint-plugin-react'
import sortImportsPlugin from 'eslint-plugin-sort-imports-es6-autofix'
import tsEslint from 'typescript-eslint'

export default [
	eslintJs.configs.recommended,
	...tsEslint.configs.recommended,
	{
		plugins: {
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'sort-imports-es6-autofix': sortImportsPlugin
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
			indent: ['error', 'tab'],
			'semi-style': ['error', 'last'],
			'no-trailing-spaces': 'error',
			'object-curly-spacing': ['error', 'always'],
			'sort-imports-es6-autofix/sort-imports-es6': [
				2,
				{
					ignoreCase: false,
					ignoreMemberSort: false,
					memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
				}
			],
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
