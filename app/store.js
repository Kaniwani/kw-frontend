/**
 * Create the store with asynchronously loaded reducers
 */

import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "react-router-redux";
import { createLogicMiddleware } from "redux-logic";
import { persistStore } from "redux-persist";
import resetMiddleware from "shared/resetMiddleware";

// import { request } from 'utils/request';
import { IS_DEV_ENV } from "shared/constants";
import globalLogic from "shared/logic";
import createReducer from "./reducers";

export default function configureStore(initialState = {}, history) {
  // inject helpers, we could make an "import request from 'utils/request'" available to all logic
  // const injectedLogicDeps = { request };
  const logicMiddleware = createLogicMiddleware(globalLogic /* , injectedLogicDeps */);

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
    const freeze = require("redux-freeze"); // eslint-disable-line global-require
    middlewares.push(freeze);
  }

  const enhancers = [
    applyMiddleware(...middlewares),
    resetMiddleware(), // registers dispatch({ type: 'RESET' }) to clear state
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    IS_DEV_ENV &&
    typeof window === "object" &&
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose);
  /* eslint-enable */

  const store = createStore(
    createReducer(),
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
      console.log("---store.asyncReducers---");
      console.log(store.asyncReducers);
      store.replaceReducer(store.asyncReducers);
    });
  }

  return { /* persistor , */ store };
}
