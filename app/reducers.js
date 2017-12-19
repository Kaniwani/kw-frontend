/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { LOCATION_CHANGE } from "react-router-redux";
import { reducer as formReducer } from "redux-form";

import { persistCombineReducers } from "redux-persist";
import localForage from "localforage";

import { IS_DEV_ENV } from "shared/constants";
import globalReducers from "shared/reducers";

export const persistConfig = {
  debug: IS_DEV_ENV,
  key: "global",
  storage: localForage,
  // TODO: nest persists (should work with async using separate config keys!) and drop top level whitelist instead?
  // https://github.com/rt2zz/redux-persist#nested-persists
  // https://github.com/rt2zz/redux-persist/issues/586
  whitelist: [
    "announcements",
    "profile",
    "settings",
    "entities",
    "queue",
    "session",
    "summary",
  ],
  debounce: 1000,
  // https://github.com/rt2zz/redux-persist/blob/master/docs/migrations.md
  version: 1,
};

// Initial routing state
const routeInitialState = {
  location: null,
};

// Merge route into the global application state
function routeReducer(state = routeInitialState, { type, payload }) {
  switch (type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return {
        ...state,
        location: payload,
      };
    default:
      return state;
  }
}

// Creates the main reducer with the asynchronously loaded ones
export default function createReducer(asyncReducers) {
  return persistCombineReducers(persistConfig, {
    ...globalReducers,
    route: routeReducer,
    form: formReducer,
    ...asyncReducers,
  });
}
