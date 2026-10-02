import globals from 'globals'

const shared_globals = {
	...globals.es2021,
	...globals.browser,
	...globals.node,
	$state: 'readonly',
	$derived: 'readonly',
	$effect: 'readonly',
	$props: 'readonly'
}

export default {
	categories: { correctness: 'error' },
	ignorePatterns: ['node_modules/**/*', 'old/**/*', '.svelte-kit/**/*', 'build/**/*'],
	overrides: [
		{
			files: ['**/*.js', '**/*.ts', '**/*.svelte', '**/*.svelte.js'],
			languageOptions: { globals: shared_globals }
		},
		{
			files: ['**/*.svelte'],
			rules: {
				'no-inner-declarations': 'off',
				'no-self-assign': 'off',
				'no-unused-expressions': 'off'
			}
		}
	],
	rules: {
		'no-empty': ['error', { allowEmptyCatch: true }],
		'no-undef': 'error',
		'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
		'unicorn/no-empty-file': 'off'
	}
}
