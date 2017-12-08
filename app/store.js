/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogicMiddleware } from 'redux-logic';
import { persistStore, persistReducer } from 'redux-persist';
import reduxReset from 'redux-reset';
import localForage from 'localforage';

// import { request } from 'utils/request';
import { IS_DEV_ENV } from 'shared/constants';
import globalLogic from 'shared/logic';
import createReducer from './reducers';

export const persistConfig = {
  debug: IS_DEV_ENV,
  key: 'kaniwani',
  storage: localForage,
  // TODO: nest persists (should work with async using separate config keys!) and drop top level whitelist instead?
  // https://github.com/rt2zz/redux-persist#nested-persists
  // https://github.com/rt2zz/redux-persist/issues/586
  whitelist: ['profile', 'settings', 'entities', 'queue', 'summary'],
  debounce: 1000,
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  version: 1,
};

export default function configureStore(initialState = {}, history) {
  // inject helpers, we could make an "import request from 'utils/request'" available to all logic
  const injectedLogicDeps = { persistConfig };
  const logicMiddleware = createLogicMiddleware(globalLogic, injectedLogicDeps);

  // Create the store with two middlewares
  // 1. createActionBuffer: collects any early logic actions and only fires them *after* state has rehydrated
  // 2. logicMiddleware: enables redux-logic
  // 3. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    //    createActionBuffer(REHYDRATE),
    logicMiddleware,
    routerMiddleware(history),
  ];

  // Enforces state to be read-only (in dev) - it'll throw if we try to mutate

  if (IS_DEV_ENV) {
    const freeze = require('redux-freeze'); // eslint-disable-line global-require
    middlewares.push(freeze);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    reduxReset(), // registers dispatch({ type: 'RESET' }) to clear state
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    IS_DEV_ENV &&
    typeof window === 'object' &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
  /* eslint-enable */

  const store = createStore(
    persistReducer(persistConfig, createReducer()),
    initialState,
    composeEnhancers(...enhancers),
  );

  const persistor = persistStore(store);

  // NOTE: quick way to clear local storage when testing
  // if (IS_DEV_ENV) {
  //   persistor.purge();
  // }

  // Extensions
  store.logicMiddleware = logicMiddleware;
  store.asyncReducers = {}; // Async reducer registry

  // FIXME: replaceReducer args? or just remove the damned asyncReducers anyway
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     console.log('---store.asyncReducers---');
  //     console.log(store.asyncReducers);
  //     store.replaceReducer(persistReducer(persistConfig, store.asyncReducers));
  //   });
  // }

  return { persistor, store };
}
