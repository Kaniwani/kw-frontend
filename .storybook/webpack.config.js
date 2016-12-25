// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config
const path = require('path');
const deepExtend = require('deep-extend');

const customJSLoader = {
  test: /\.jsx?$/,
  loader: '/home/subrosa/Documents/projects/kw-frontend/node_modules/babel-loader/lib/index.js',
  exclude: [path.resolve(__dirname, '../node_modules/')],
  include: [
    path.resolve(__dirname, '../app/'),
    path.resolve(__dirname, '../'),
  ],
  query: {
    babelrc: false,
    cacheDirectory: '/home/subrosa/Documents/projects/kw-frontend/node_modules/.cache/react-storybook',
    presets: ['/home/subrosa/Documents/projects/kw-frontend/node_modules/babel-preset-react-app/index.js'],
    plugins: [[
      '/home/subrosa/Documents/projects/kw-frontend/node_modules/babel-plugin-react-docgen/lib/index.js', {
        DOC_GEN_COLLECTION_NAME: 'STORYBOOK_REACT_CLASSES',
      },
    ]],
  },
};

const customLoaders = [
  {
    test: /\.css$/,
    include: path.resolve(__dirname, '../node_modules/'),
    loaders: ['style-loader', 'css-loader'],
  }, {
    test: /\.(eot|svg|ttf|woff|woff2)$/,
    loader: 'file-loader',
  }, {
    test: /\.(jpg|png|gif)$/,
    loaders: [
      'file-loader', {
        loader: 'image-webpack',
        query: {
          progressive: true,
          optimizationLevel: 7,
          interlaced: false,
          pngquant: {
            quality: '65-90',
            speed: 4,
          },
        },
      },
    ],
  }, {
    test: /\.html$/,
    loader: 'html-loader',
  }, {
    test: /\.json$/,
    loader: 'json-loader',
  }, {
    test: /\.(mp4|webm)$/,
    loader: 'url-loader',
    query: {
      limit: 10000,
    },
  },
];
// load the default config generator.
const genDefaultConfig = require('@kadira/storybook/dist/server/config/defaults/webpack.config.js');

module.exports = (config, env) => {
  const customConfig = genDefaultConfig(config, env);
  customConfig.module.loaders[0] = customJSLoader;
  customConfig.module.loaders.push(customLoaders);

  customConfig.resolve = deepExtend(customConfig.resolve, {
    modules: [path.resolve(__dirname, 'app')],
    mainFields: ['browser', 'jsnext:main', 'main'],
  });
  // customConfig.module.loaders.forEach((loader) => console.log(loader, loader.plugins));
  return customConfig;
};
