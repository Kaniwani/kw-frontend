module.exports = {
  containerQuerySelector: "#app",
  proxiesPath: "../cosmos.proxies.js",
  rootPath: "./app/",
  webpackConfigPath: "../internals/webpack/webpack.dev.babel.js",
  globalImports: ["global-styles.js"],
  // hot: false,
  // publicPath: 'build',
  ignore: [/internals/, /server/, /__tests__/],
};
