/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const { DefinePlugin } = require('webpack');
const DotenvPlugin = require('dotenv-webpack');

module.exports = (options) => ({
  mode: options.mode,
  entry: [require.resolve('react-app-polyfill/ie11'), ...options.entry],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
    ...options.output, // Merge with env dependent settings
  },
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.(gif|png|jpe?g|ico)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                optimizationLevel: 7,
              },
              gifsicle: {
                interlaced: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: 'json-loader',
      },
      {
        test: /\.(mp4|webm)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new DotenvPlugin({
      systemVars: true,
    }),
    new DefinePlugin({
      'process.env': {
        VERSION: JSON.stringify(process.env.npm_package_version),
      },
    }),
    ...options.plugins,
  ],
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'main', 'module'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
