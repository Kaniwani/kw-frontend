/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */


// TODO: replace with real actions/reducers relevant to dashboard
import {
  CHANGE_USERNAME,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the HomePage
const initialState = fromJS({});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_USERNAME:
      return state
        .setIn(['user', 'name'], action.name);
    default:
      return state;
  }
}

export default homeReducer;