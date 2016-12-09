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

import {
  LOAD_USERDATA_SUCCESS,
  LOAD_USERDATA,
  LOAD_USERDATA_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  loading: false,
  error: false,
  user: null,
  modal: modalInitialState,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERDATA:
      return state
        .set('loading', true)
        .set('error', false);
    case LOAD_USERDATA_SUCCESS:
      return state
        .set('user', fromJS(action.payload))
        .set('loading', false);
    case LOAD_USERDATA_ERROR:
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
