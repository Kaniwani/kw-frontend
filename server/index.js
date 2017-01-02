/* eslint import/newline-after-import:0, consistent-return:0 */

const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();

const devData = require('./devData');
const devVocabData = require('./devVocabData');

const randDelay = (cb) => setTimeout(() => cb(), +(((Math.random() * /* 2000*/ 1000) / 1.5).toPrecision(3)));

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// NOTE:10 these are temporary routes during dev
app.use('/api/reviews', (req, res) => randDelay(() => res.json(devData.reviews)));
app.use('/api/profiles', (req, res) => randDelay(() => res.json(devData.profiles)));
app.use('/api/vocabulary', (req, res) => randDelay(() => res.json(devVocabData)));
app.use('/api/', (req, res) => randDelay(() => res.json(devData)));

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended port number, use port 3000 if not provided
const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, (err) => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, url);
    });
  } else {
    logger.appStarted(port);
  }
});
