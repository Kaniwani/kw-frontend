module.exports = {
  containerQuerySelector: "#app",
  proxiesPath: "../cosmos.proxies.js",
  rootPath: "./app/",
  webpackConfigPath: "../internals/webpack/webpack.dev.babel.js",
  globalImports: ["common/styles/global.js"],
  // hot: false,
  // publicPath: 'build',
  exclude: [/internals/, /server/, /__tests__/, /__old_fixtures__/],
};
