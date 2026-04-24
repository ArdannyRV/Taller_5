// https://docs.expo.dev/guides/using-eslint/
// [RETO 0]: Configuración de reglas de fronteras FSD para bloqueo de imports entre capas.
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    files: ['src/shared/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@entities/*'], message: 'FSD prohíbe importar desde capas superiores a shared' },
            { group: ['@features/*'], message: 'FSD prohíbe importar desde capas superiores a shared' },
            { group: ['@widgets/*'], message: 'FSD prohíbe importar desde capas superiores a shared' },
            { group: ['@pages/*'], message: 'FSD prohíbe importar desde capas superiores a shared' },
            { group: ['@app/*'], message: 'FSD prohíbe importar desde capas superiores a shared' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@features/*'], message: 'FSD prohíbe importar desde capas superiores a entities' },
            { group: ['@widgets/*'], message: 'FSD prohíbe importar desde capas superiores a entities' },
            { group: ['@pages/*'], message: 'FSD prohíbe importar desde capas superiores a entities' },
            { group: ['@app/*'], message: 'FSD prohíbe importar desde capas superiores a entities' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@widgets/*'], message: 'FSD prohíbe importar desde capas superiores a features' },
            { group: ['@pages/*'], message: 'FSD prohíbe importar desde capas superiores a features' },
            { group: ['@app/*'], message: 'FSD prohíbe importar desde capas superiores a features' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/widgets/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@pages/*'], message: 'FSD prohíbe importar desde capas superiores a widgets' },
            { group: ['@app/*'], message: 'FSD prohíbe importar desde capas superiores a widgets' },
          ],
        },
      ],
    },
  },
  {
    files: ['src/pages/**/*'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['@app/*'], message: 'FSD prohíbe importar desde capas superiores a pages' },
          ],
        },
      ],
    },
  },
]);
