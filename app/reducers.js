/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form/immutable';
import notificationsReducer from 'containers/Notifications/reducer';

import * as storage from 'redux-storage';
import merger from 'redux-storage-merger-immutablejs';

import globalReducer from 'containers/App/reducer';
import reviewReducer from 'containers/ReviewPage/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

function wrapWithLocalStoragePersistence(combinedReducers) {
  return storage.reducer(combinedReducers, merger);
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return wrapWithLocalStoragePersistence(combineReducers({
    route: routeReducer,
    global: globalReducer,
    form: formReducer,
    notifications: notificationsReducer,
    // Review is actually async, but providing it here so when storage rehydrates
    // there is some initial empty state to overwrite even if user has never visited review before
    review: reviewReducer,
    ...asyncReducers,
  }));
}
