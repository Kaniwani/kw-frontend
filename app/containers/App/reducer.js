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

import {
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA,
  LOAD_USERDATA_ERROR,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    userData: false,
  },
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERDATA:
      return state
        .set('loading', true)
        .set('error', false)
        .setIn(['userData', 'userData'], false);
    case LOAD_USERDATA_SUCCESS:
      return state
        .setIn(['userData', 'userData'], action.userData)
        .set('loading', false)
        .set('currentUser', action.username);
    case LOAD_USERDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    default:
      return state;
  }
}

export default appReducer;
