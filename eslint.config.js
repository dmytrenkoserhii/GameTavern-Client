import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'off',
        {
          allowConstantExport: true,
        },
      ],
      semi: 'error',
      'array-callback-return': 'error',
      'for-direction': 'error',
      'getter-return': 'error',
      'no-constructor-return': 'error',
      'no-debugger': 'error',
      'no-dupe-args': 'error',
      'no-dupe-class-members': 'error',
      'no-dupe-else-if': 'error',
      'no-dupe-keys': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-self-assign': 'error',
      'no-self-compare': 'error',
      'no-unreachable': 'error',
      'no-alert': 'error',
      'no-eval': 'error',
      curly: 'error',
      'default-case-last': 'error',
      eqeqeq: 'error',
      'no-extra-boolean-cast': 'error',
      'no-extra-semi': 'error',
      'no-invalid-this': 'error',
      'no-labels': 'error',
      'no-lone-blocks': 'error',
      'no-nested-ternary': 'error',
      'no-param-reassign': 'error',
      'no-return-assign': 'error',
      'no-undef-init': 'error',
      'no-unneeded-ternary': 'error',
      'no-useless-return': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'array-bracket-spacing': ['error', 'never'],
      'arrow-parens': ['error', 'always'],
      'block-spacing': ['error', 'always'],
      'comma-dangle': ['error', 'only-multiline'],
      'dot-location': ['error', 'property'],
      '@typescript-eslint/no-empty-function': 'off',
      'no-empty-function': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      'arrow-spacing': [
        'error',
        {
          before: true,
          after: true,
        },
      ],
      'no-multiple-empty-lines': [
        'error',
        {
          max: 1,
        },
      ],
      'no-restricted-imports': [
        'error',
        {
          patterns: ['@/features/*/*', '@/types/*/*'],
        },
      ],
    },
  },
);
