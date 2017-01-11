/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import * as App from './constants';
import * as Storage from 'redux-storage';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  user: {
    name: '',
    reviewCount: 0,
    apiKey: '',
    apiValid: null,
    joinDate: null,
    lastLogin: null,
    lastWkSyncDate: null,
    lastKwSyncDate: null,
    level: 0,
    unlockedLevels: null,
    settings: {
      followMe: null,
      autoAdvanceCorrect: null,
      autoAdvanceDelay: 3000,
      autoExpandCorrect: null,
      autoExpandIncorrect: null,
      burnedOnly: null,
      onVacation: null,
      vacationDate: null,
    },
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case Storage.LOAD:
      return state.set(action.payload);
    case Storage.SAVE:
      console.info('%cStorage saved!', 'color: blue'); // eslint-disable-line no-console
      return state;
    case App.LOAD_USERDATA:
      return state
        .set('loading', action.showIndicator)
        .set('error', false);
    case App.LOAD_USERDATA_SUCCESS:
      return state
        .set('user', fromJS(action.payload))
        .set('loading', false);
    case App.LOAD_USERDATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
