const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = require('./webpack.base.babel')({
  mode: 'production',
  // In production, we skip all hot-reloading stuff
  entry: [path.join(process.cwd(), 'app/index.js')],

  // ignore source-maps in open devtools in production, but still create and link them for uploading to Sentry
  devtool: 'hidden-source-map',

  babelQuery: { plugins: ['recharts'] },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  optimization: {
    minimize: true,
    sideEffects: true,
    concatenateModules: true,
  },

  plugins: [
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: true,
    }),

    new WebpackPwaManifest({
      filename: 'manifest.json',
      name: 'KaniWani',
      short_name: 'KaniWani',
      background_color: '#fafafa',
      theme_color: '#8523e7',
      display: 'fullscreen',
      orientation: 'portrait',
      start_url: '/',
      ios: true,
      icons: [
        {
          src: path.resolve('app/common/assets/img/logo.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
        },
        {
          src: path.resolve('app/common/assets/img/logo-square.png'),
          sizes: [120, 152, 167, 180],
          ios: true,
        },
      ],
    }),

    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
      relativePaths: false,
      publicPath: '/',
      excludes: ['**/*.map'],
      autoUpdate: true, // checks once an hour

      ServiceWorker: {
        events: true,
      },

      // Removes warning for about `additional` section usage
      safeToUseOptionalCaches: true,

      caches: {
        main: [':rest:'],
        // All chunks marked as `additional`, loaded after main section
        // and do not prevent SW to install. Change to `optional` if
        // do not want them to be preloaded at all (cached only when first loaded)
        additional: ['*.chunk.js', '*.mp4', '*.webm', '*.jpg'],
        optional: ['*.svg', '*.png', '*.woff*'],
      },
    }),
  ],

  performance: {
    assetFilter: (assetFilename) => !/(\.map$)|(^(main\.|favicon\.))/.test(assetFilename),
  },
});
