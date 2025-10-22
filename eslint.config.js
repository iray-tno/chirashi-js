const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');
const importPlugin = require('eslint-plugin-import');

module.exports = tseslint.config(
    // Global ignores (equivalent to .eslintignore)
    {
        ignores: [
            'node_modules/**',
            'public/**',
            'coverage/**',
            'temp/**',
            'src/gatsby-types.d.ts',
            '.cache/**',
            'vitest.config.ts',
        ],
    },

    // Base ESLint recommended rules
    js.configs.recommended,

    // TypeScript files configuration
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: './tsconfig.json',
                sourceType: 'module',
            },
            globals: {
                // Gatsby-generated global
                Queries: 'readonly',
                // Node.js globals (for Gatsby config files)
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                // Browser globals
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint.plugin,
            'react': reactPlugin,
            'react-hooks': reactHooksPlugin,
            'jsx-a11y': jsxA11yPlugin,
            'import': importPlugin,
        },
        settings: {
            react: {
                version: 'detect',
            },
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            // ESLint base rules
            'arrow-body-style': 'off',
            'indent': ['error', 4],
            'no-param-reassign': [
                'error',
                {
                    props: true,
                    ignorePropertyModificationsFor: ['draftState'],
                },
            ],

            // React rules
            ...reactPlugin.configs.recommended.rules,
            ...reactPlugin.configs['jsx-runtime'].rules,
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],
            'react/jsx-one-expression-per-line': [
                'error',
                { allow: 'single-child' },
            ],
            'react/jsx-filename-extension': [
                'error',
                { extensions: ['.jsx', '.tsx'] },
            ],
            'react/prefer-stateless-function': 'off',
            'react/prop-types': 'off',
            'react/display-name': 'off',

            // React Hooks rules
            ...reactHooksPlugin.configs.recommended.rules,

            // JSX a11y rules
            ...jsxA11yPlugin.configs.recommended.rules,

            // TypeScript rules
            ...tseslint.configs.recommended[0].rules,
            // Note: @typescript-eslint/member-delimiter-style was removed in v6
            // If you need this rule, you can configure it in your editor/formatter
            'no-unused-vars': 'off', // Turn off base rule for TypeScript files
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    args: 'all',
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            // Import rules
            'import/extensions': [
                'error',
                'ignorePackages',
                {
                    js: 'never',
                    jsx: 'never',
                    ts: 'never',
                    tsx: 'never',
                    json: 'always',
                    css: 'always',
                },
            ],
            'import/prefer-default-export': 'off',
            'import/no-unresolved': 'off', // Disabled due to TypeScript resolver issues

            // Disable styleName check - it's from react-css-modules
            'react/no-unknown-property': ['error', { ignore: ['styleName'] }],
        },
    },

    // JavaScript files configuration (for config files, Gatsby files, etc.)
    {
        files: ['**/*.js', '.storybook/*.js'],
        languageOptions: {
            sourceType: 'module',
            ecmaVersion: 2022,
            globals: {
                // Node.js globals
                __dirname: 'readonly',
                __filename: 'readonly',
                process: 'readonly',
                module: 'readonly',
                require: 'readonly',
                exports: 'writable',
                global: 'writable',
                // Browser globals
                window: 'writable',
                document: 'readonly',
                navigator: 'readonly',
                console: 'readonly',
            },
        },
        plugins: {
            'react': reactPlugin,
            'import': importPlugin,
        },
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            'no-console': 'off',
        },
    },

    // Test files configuration
    {
        files: ['**/*.test.js', '**/*.test.jsx', '**/*.test.ts', '**/*.test.tsx'],
        languageOptions: {
            globals: {
                jest: 'readonly',
                describe: 'readonly',
                it: 'readonly',
                expect: 'readonly',
                beforeEach: 'readonly',
                afterEach: 'readonly',
                beforeAll: 'readonly',
                afterAll: 'readonly',
                test: 'readonly',
            },
        },
    },

    // Storybook and test files - allow devDependencies
    {
        files: [
            '.storybook/*.js',
            '**/*.test.js',
            '**/*.test.jsx',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/*.stories.js',
            '**/*.stories.jsx',
            '**/*.stories.ts',
            '**/*.stories.tsx',
        ],
        rules: {
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true,
                    optionalDependencies: false,
                },
            ],
        },
    },
);
