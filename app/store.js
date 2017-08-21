/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { autoRehydrate, persistStore } from 'redux-persist';
import { REHYDRATE } from 'redux-persist/constants';
import jsonTransform from 'utils/jsonTransform';

import createActionBuffer from 'redux-action-buffer';
import localForage from 'localforage';

// import { request } from 'utils/request';
import globalLogic from 'containers/App/logic';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  // inject helpers, we could make an "import request from 'utils/request'" available to all logic
  // const injectedHelpers = { request };
  const logicMiddleware = createLogicMiddleware(globalLogic, /* injectedHelpers */);

  // Create the store with two middlewares
  // 1. createActionBuffer: collects any early logic actions and only fires them *after* state has rehydrated
  // 2. logicMiddleware: enables redux-logic
  // 3. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    createActionBuffer(REHYDRATE),
    logicMiddleware,
    routerMiddleware(history),
  ];

  // Enforces state to be read-only (in dev) - it'll throw if we try to mutate
  if (process.env.NODE_ENV !== 'production') {
    const freeze = require('redux-freeze'); // eslint-disable-line global-require
    middlewares.push(freeze);
  }

  const enhancers = [
    autoRehydrate(),
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  persistStore(store, {
    storage: localForage,
    whitelist: ['global'],
    debounce: 1500,
    transforms: [jsonTransform],
  });

  // Extensions
  store.logicMiddleware = logicMiddleware;
  store.asyncReducers = {}; // Async reducer registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  return store;
}
