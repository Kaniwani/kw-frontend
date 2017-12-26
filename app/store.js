/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { createLogicMiddleware } from "redux-logic";
import { persistStore } from "redux-persist";
import resetMiddleware from "shared/resetMiddleware";

// import { request } from 'utils/request';
import { IS_DEV_ENV } from "shared/constants";
import globalLogic from "shared/logic";
import createReducer from "./reducers";

export default function configureStore(initialState = {}, history) {
  // inject helpers, we could make an "import request from 'utils/request'" available to all logic
  //  const injectedLogicDeps = { persistConfig };
  const logicMiddleware = createLogicMiddleware(globalLogic, { history });

  // Create the store with two middlewares
  // 1. logicMiddleware: enables redux-logic
  const middlewares = [logicMiddleware];

  // Enforces state to be read-only (in dev) - it'll throw if we try to mutate
  if (IS_DEV_ENV) {
    const freeze = require("redux-freeze"); // eslint-disable-line global-require
    middlewares.push(freeze);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    resetMiddleware(), // registers dispatch({ type: 'RESET' }) to clear state
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  const composeEnhancers =
    IS_DEV_ENV &&
    typeof window === "object" &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose); // eslint-disable-line no-underscore-dangle

  const store = createStore(
    createReducer(), // persistReducer(persistConfig, createReducer()),
    initialState,
    composeEnhancers(...enhancers)
  );

  //  const persistor = persistStore(store);

  // NOTE: quick way to clear local storage when testing
  // if (IS_DEV_ENV) {
  //   persistor.purge();
  // }

  // Extensions
  store.logicMiddleware = logicMiddleware;
  store.asyncReducers = {}; // Async reducer registry

  // FIXME: replaceReducer args? or just remove the damned asyncReducers anyway
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("./reducers", () => {
      console.log("hmr ./reducers");
      console.log(store.asyncReducers);
      store.replaceReducer(createReducer(store.asyncReducers));
    });
  }

  return { /* persistor , */ store };
}
