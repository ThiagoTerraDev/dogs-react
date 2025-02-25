import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{js,mjs,cjs,jsx}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  { 
    rules: { 
      quotes: ['error', 'single'],
      semi : ['error', 'always'],
      'react/jsx-max-props-per-line': ['error', { maximum: 2 }],
      'react/jsx-indent': ['error', 2],
      'react/prop-types': 'off',
    } 
  },
];
