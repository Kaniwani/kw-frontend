process.env.BABEL_ENV = 'test';

module.exports = (wallaby) => {
  console.log(wallaby);
  return {
    files: [
      'app/**/*.js',
      'app/**/*.json',
      'package.json',
      '!app/**/*.test.js',
      '!app/**/*.fixture.js',
    ],
    tests: ['app/common/__tests__/serializers.test.js'],

    env: {
      type: 'node',
      runner: 'node',
    },

    testFramework: 'jest',

    compilers: {
      '**/*.js': wallaby.compilers.babel(require('./package.json').babel), // eslint-disable-line global-require
    },

    setup() {
      const jestConfig = require('./package.json').jest; // eslint-disable-line global-require
      wallaby.testFramework.configure(jestConfig);
    },
  };
};
