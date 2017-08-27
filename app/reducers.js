/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux';
import { LOCATION_CHANGE } from 'react-router-redux';

import globalReducers from 'containers/App/reducer';

import uiReducer from 'shared/reducers';
import { reducer as formReducer } from 'redux-form';
// import notificationsReducer from 'containers/Notifications/reducer';

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
  return combineReducers({
    ...globalReducers,
    route: routeReducer,
    form: formReducer,
    ui: uiReducer,
    // notifications: notificationsReducer,
    ...asyncReducers,
  });
}
