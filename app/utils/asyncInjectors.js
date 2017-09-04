import { conformsTo, isEmpty, isFunction, isObject, isString } from 'lodash';
import invariant from 'invariant';
import warning from 'warning';

import createReducer from '../reducers';

// Validate the shape of redux store
export function checkStore(store) {
  const shape = {
    dispatch: isFunction,
    subscribe: isFunction,
    getState: isFunction,
    logicMiddleware: isFunction,
    replaceReducer: isFunction,
    asyncReducers: isObject,
  };
  invariant(
    conformsTo(store, shape),
    '(app/utils...) asyncInjectors: Expected a valid redux store'
  );
}

// Inject an asynchronously loaded reducer
export function injectAsyncReducer(store, isValid) {
  return function injectReducer(name, asyncReducer) {
    if (!isValid) checkStore(store);

    invariant(
      isString(name) && !isEmpty(name) && isFunction(asyncReducer),
      '(app/utils...) injectAsyncReducer: Expected `asyncReducer` to be a reducer function'
    );

    if (Reflect.has(store.asyncReducers, name)) return;

    store.asyncReducers[name] = asyncReducer; // eslint-disable-line no-param-reassign
    store.replaceReducer(createReducer(store.asyncReducers));
  };
}

// Inject an asynchronously loaded logic
export function injectAsyncLogic(store, isValid) {
  return function injectLogic(logic, onLogicInit) {
    if (!isValid) checkStore(store);

    invariant(
      Array.isArray(logic),
      '(app/utils...) injectAsyncLogic: Expected `logic` to be an array of logic objects'
    );

    warning(
      !isEmpty(logic),
      '(app/utils...) injectAsyncLogic: Received an empty `logic` array'
    );

    store.logicMiddleware.mergeNewLogic(logic);

    // TODO: DOES THIS WORK AS EXPECTED? TEST THAT IT ONLY RUNS ONCE
    if (onLogicInit) {
      invariant(
        isFunction(onLogicInit),
        '(app/utils...) injectAsyncLogic: Expected `onLogicInit` to be a function'
      );
      onLogicInit(store);
    }
  };
}

// Helper for creating injectors
export function getAsyncInjectors(store) {
  checkStore(store);

  return {
    injectReducer: injectAsyncReducer(store, true),
    injectLogic: injectAsyncLogic(store, true),
  };
}


// Helper to log an error when asynchronous loading fails.
export function errorLoading(err) {
  if (process.env.NODE_ENV !== 'production') {
    /* istanbul ignore next */
    console.error('Error while loading or handling loaded components, logic, or reducers\n', err); // eslint-disable-line no-console
  }
}
