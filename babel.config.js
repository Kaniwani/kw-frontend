const snakeCase = require('lodash/snakeCase');

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: false,
        modules: false,
        useBuiltIns: 'usage',
        corejs: 3,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  env: {
    development: {
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: true,
          },
        ],
      ],
    },
    production: {
      only: ['app'],
      plugins: [
        [
          'babel-plugin-styled-components',
          {
            displayName: false,
          },
        ],
        'recharts',
        [
          'transform-imports',
          {
            voca: {
              transform: (importName) => `voca/${snakeCase(importName)}`,
              preventFullImport: true,
            },
            'date-fns': {
              transform: (importName) => `date-fns/${snakeCase(importName)}`,
              preventFullImport: true,
            },
            recompose: {
              transform: (importName) => `recompose/${importName}`,
              preventFullImport: true,
            },
            lodash: {
              transform: (importName) => `lodash/${importName}`,
              preventFullImport: true,
            },
            'redux-form': {
              transform: (importName) => `redux-form/es/${importName}`,
              preventFullImport: true,
            },
          },
        ],
        [
          'transform-react-remove-prop-types',
          {
            removeImport: true,
          },
        ],
        '@babel/plugin-transform-react-inline-elements',
        '@babel/plugin-transform-react-constant-elements',
      ],
    },
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'dynamic-import-node'],
    },
  },
};
