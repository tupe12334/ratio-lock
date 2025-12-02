import agentConfig from 'eslint-config-agent'
import publishablePackageJson from 'eslint-config-publishable-package-json'

export default [
  ...agentConfig,
  publishablePackageJson,
  {
    ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs', 'docs/**'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
  },
  {
    rules: {
      // Disable overly strict security rules for array index access
      'security/detect-object-injection': 'off',
      // Allow type assertions for react-hook-form generic types
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TSAsExpression[typeAnnotation.typeName.name="const"]',
          message: 'as const assertions are allowed',
        },
      ],
      // Disable spec file requirement for React hooks (tested through integration)
      'ddd/require-spec-file': 'off',
    },
  },
]
