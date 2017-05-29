// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config
const path = require('path');
const deepExtend = require('deep-extend');
// // for reference if we need
// const customLoaders = [
//   {
//     test: /\.css$/,
//     include: path.resolve(__dirname, '../node_modules/'),
//     loaders: ['style-loader', 'css-loader'],
//   }, {
//     test: /\.(eot|svg|ttf|woff|woff2)$/,
//     loader: 'file-loader',
//   }, {
//     test: /\.(jpg|png|gif)$/,
//     loaders: [
//       'file-loader', {
//         loader: 'image-webpack-loader',
//         query: {
//           progressive: true,
//           optimizationLevel: 7,
//           interlaced: false,
//           pngquant: {
//             quality: '65-90',
//             speed: 4,
//           },
//         },
//       },
//     ],
//   }, {
//     test: /\.html$/,
//     loader: 'html-loader',
//   }, {
//     test: /\.json$/,
//     loader: 'json-loader',
//   }, {
//     test: /\.(mp4|webm)$/,
//     loader: 'url-loader',
//     query: {
//       limit: 10000,
//     },
//   },
// ];

// load the default config generator.
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) => {
  const customConfig = genDefaultConfig(config, env);
  // customConfig.module.loaders.push(...customLoaders);

  customConfig.resolve = deepExtend(customConfig.resolve, {
    modules: [path.resolve(__dirname, '..', 'app')],
    mainFields: ['browser', 'jsnext:main', 'main'],
    // We're not using relative paths in our kw dev setup, alias these so we can resolve properly
    alias: {
      base: path.resolve(__dirname, '..', 'app/base'),
      components: path.resolve(__dirname, '..', 'app/components'),
      decorators: path.resolve(__dirname, '..', 'app/decorators'),
      containers: path.resolve(__dirname, '..', 'app/containers'),
      layouts: path.resolve(__dirname, '..', 'app/layouts'),
      shared: path.resolve(__dirname, '..', 'app/shared'),
      utils: path.resolve(__dirname, '..', 'app/utils'),
    },
  });

  return customConfig;
};
