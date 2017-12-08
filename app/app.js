// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

import { IS_PROD_ENV } from 'shared/constants';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ErrorBoundary from 'components/ErrorBoundary';
import App from 'containers/App';

// Import default LoadingComponent provider and LoadingIndicator that will be used as a loading component
import DefaultLoadingComponentProvider from 'routing/DefaultLoadingComponentProvider';

// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./favicon.png';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess'; // eslint-disable-line import/extensions
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import './global-styles';

import configureStore from './store';

// Create redux store with history
const initialState = {};
const history = createHistory();
const { persistor, store } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <DefaultLoadingComponentProvider component={null}>
          <ConnectedRouter history={history}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </ConnectedRouter>
        </DefaultLoadingComponentProvider>
      </PersistGate>
    </Provider>,
    MOUNT_NODE
  );
};


if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('containers/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (IS_PROD_ENV) {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
