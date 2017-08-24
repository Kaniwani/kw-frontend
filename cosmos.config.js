const glob = require('glob');

const base = glob.sync('app/base/**/index.js');
const components = glob.sync('app/components/**/index.js');
// const containers = glob.sync('app/containers/**/index.js');

module.exports = {
  getComponentName: (componentPath) => componentPath.match(/app\/(?:base|components|containers)\/(.+)\/index.js$/)[1],
  componentPaths: base.concat(components)/* .concat(containers) */,
  // Optionally, reuse loaders and plugins from your existing webpack config
  webpackConfigPath: './internals/webpack/webpack.dev.babel.js',
  hmrPlugin: false,
  containerQuerySelector: '#app',
  //  publicPath: 'build',
  proxies: ['react-cosmos-redux-proxy', 'react-cosmos-router-proxy'],
  ignore: [
    /tests/,
    /writeFixtures/,
  ],
};
