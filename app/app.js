/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill';

/* eslint-disable import/no-unresolved, import/extensions, import/no-webpack-loader-syntax */
// Load the favicon, manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./favicon.ico';
import 'file?name=[name].[ext]!./favicon.png';
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions, import/no-webpack-loader-syntax */

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import configureStore from './store';
import { loadFromLocalStorage } from './storageEngine';

// Import the CSS reset & global styles, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import './global-styles';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), makeSelectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { makeSelectLocationState } from 'containers/App/selectors';

export const history = syncHistoryWithStore(browserHistory, store, { // eslint-disable-line import/prefer-default-export
  selectLocationState: makeSelectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App';
import createRoutes from './routes';

const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router
        history={history}
        routes={rootRoute}
        render={
          // Scroll to top when going to a new page, imitating default browser
          // behaviour
          applyRouterMiddleware(useScroll())
        }
      />
    </Provider>,
    document.getElementById('app'),
  );
};

// Initial render
render();
// Rehydrate data
loadFromLocalStorage(store)
  .catch((err) => {
    console.error('Failed to load previous state:', err);
  }); // eslint-disable-line no-console

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
