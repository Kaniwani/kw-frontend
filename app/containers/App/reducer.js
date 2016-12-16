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
import modalReducer, { modalInitialState } from 'containers/Modal/reducer';
import * as Modal from 'containers/Modal/constants';
import * as App from './constants';

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  modal: modalInitialState,
  user: {
    name: null,
    reviewCount: null,
    apiKey: null,
    apiValid: null,
    joinDate: null,
    lastWkSyncDate: new Date(),
    level: null,
    unlockedLevels: null,
    settings: {
      followMe: null,
      autoAdvanceCorrect: null,
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
    case App.LOAD_USERDATA:
      return state
        .set('loading', true)
        .set('error', false);
    case App.LOAD_USERDATA_SUCCESS:
      return state
        .set('user', fromJS(action.payload))
        .set('loading', false);
    case App.LOAD_USERDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case Modal.SHOW_MODAL:
    case Modal.HIDE_MODAL:
      return state.set('modal', fromJS(modalReducer(state.get('modal'), action)));
    default:
      return state;
  }
}

export default appReducer;
