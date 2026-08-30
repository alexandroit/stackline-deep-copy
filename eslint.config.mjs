import js from '@eslint/js'

export default [
  {
    ignores: ['coverage/**', 'dist/**', 'node_modules/**', 'release-candidate/**', 'site-dist/**']
  },
  js.configs.recommended,
  {
    files: ['index.js', 'scripts/**/*.cjs', 'test/**/*.cjs'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        ArrayBuffer: 'readonly',
        Buffer: 'readonly',
        console: 'readonly',
        DataView: 'readonly',
        Map: 'readonly',
        Set: 'readonly',
        Uint8Array: 'readonly',
        define: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        process: 'readonly',
        require: 'readonly'
      }
    },
    rules: {
      'no-new-wrappers': 'off',
      'no-prototype-builtins': 'off'
    }
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        URL: 'readonly'
      }
    }
  },
  {
    files: ['docs-site/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly'
      }
    }
  },
  {
    files: ['examples/**/*'],
    languageOptions: {
      globals: {
        console: 'readonly',
        require: 'readonly'
      }
    }
  }
]
