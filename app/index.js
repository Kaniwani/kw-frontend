import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Provider as ThemeProvider } from 'rebass';

import createHistory from 'history/createBrowserHistory';
import 'sanitize.css/sanitize.css';

import { IS_PROD_ENV } from 'common/constants';
import { PersistGate } from 'redux-persist/lib/integration/react';

// Import default LoadingComponent provider and LoadingIndicator that will be used as a loading component
import DefaultLoadingComponentProvider from 'common/components/Loadable/DefaultLoadingComponentProvider';
import ErrorBoundary from 'common/components/ErrorBoundary';

/* eslint-disable import/no-unresolved, import/extensions */
import '!file-loader?name=[name].[ext]!./favicon.ico';
/* eslint-enable import/no-webpack-loader-syntax */

// Import CSS reset and Global Styles
import 'common/styles/global';

import configureStore from './store/configureStore';

// Create redux store with history
const initialState = {};
const history = createHistory();
const { persistor, store } = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  try {
    localStorage.setItem('kw_bootstrapped', 'true');
  } catch (e) {
    window.alert(
      'LocalStorage access has been denied by your browser. Kaniwani will not work properly if we cannot store local data! Please re-enable it in browser settings or upgrade your browser to use this site.'
    );
  }
  // Dynamically import our main App component, and render it
  const App = require('pages/App').default;

  ReactDOM.render(
    <ErrorBoundary>
      <DefaultLoadingComponentProvider component={null}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <ConnectedRouter history={history}>
              <ThemeProvider>
                <App />
              </ThemeProvider>
            </ConnectedRouter>
          </PersistGate>
        </Provider>
      </DefaultLoadingComponentProvider>
    </ErrorBoundary>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept('pages/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (IS_PROD_ENV) {
  const runtime = require('offline-plugin/runtime');
  runtime.install({
    onUpdateReady: () => {
      console.info(`Kaniwani: update ready`);
      // Tell new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdating: () => {
      console.info(`Kaniwani: updating`);
    },
    onUpdated: () => {
      console.info(`Kaniwani: update successful`);
      window.alert(`Kaniwani has been updated and will now reload.`);
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.warn(`Kaniwani: update failed`);
    },
  });
}

/* eslint-disable */
// Trace component updates to determine any necessary perf optimizations
//   // From devtools console:
//   // To enable temporarily: Why();
//   // To enable until disabled (even after refresh): Why(true);
//   // To disable: Why(false);
//   const Why = (enabled) => {
//     if (enabled) {
//       console.debug('why-did-you-update always');
//       window.localStorage.setItem('why-did-you-update', true);
//     } else if (enabled === false) {
//       console.debug('why-did-you-update never');
//       window.localStorage.removeItem('why-did-you-update');
//       React.__WHY_DID_YOU_UPDATE_RESTORE_FN__ && React.__WHY_DID_YOU_UPDATE_RESTORE_FN__();
//       return;
//     }
//     console.debug('why-did-you-update enabled');
//     const { whyDidYouUpdate } = require('why-did-you-update');
//     whyDidYouUpdate(React);
//   };

//   window.Why = Why;
//   if (window.localStorage.getItem('why-did-you-update')) {
//     Why();
//   }
/* eslint-enable */
