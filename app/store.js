/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localforage';
import immutableEngineFilter from 'redux-storage-decorator-immutable-filter';
import createReducer from './reducers';

import {
  PERSISTENCE_ACTION_WHITELIST,
  PERSISTENCE_STATE_WHITELIST,
} from 'shared/constants';

// redux-storage
const engine = immutableEngineFilter(
  createEngine('kwStorage', { name: 'kaniwani' }),
  PERSISTENCE_STATE_WHITELIST,
);

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history) {
  // Create the store with three middlewares
  // 1. storage.createMiddleware(engine): persist state to localstorage with blacklist array of actions *not* to trigger save
  // 2. sagaMiddleware: Makes redux-sagas work
  // 3. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [
    storage.createMiddleware(engine, [], PERSISTENCE_ACTION_WHITELIST),
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
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
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  // Extensions
  store.runSaga = sagaMiddleware.run;
  store.asyncReducers = {}; // Async reducer registry
  store.asyncSagas = {}; // Async saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      System.import('./reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }

  const loadFromLocalStorage = storage.createLoader(engine);
  // Notice that our load function will return a promise that can also be used
  // to respond to the restore event.
  loadFromLocalStorage(store)
    // TODO: remove logs when happy all is safe
    .then((newState) => console.info('Loaded state:', newState))
    .catch((err) => console.error('Failed to load previous state:', err));

  return store;
}
