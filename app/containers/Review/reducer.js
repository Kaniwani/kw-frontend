/*
 * Review Reducer
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
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_ERROR,
  ROTATE_CURRENT_REVIEW,
} from './constants';
import { fromJS } from 'immutable';

// The initial state of the Review
const initialState = fromJS({
  loading: false,
  error: false,
  reviews: false,
  current: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWDATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('reviews', false);
    case LOAD_REVIEWDATA_SUCCESS:
      return state
        .set('reviews', action.reviews)
        .set('loading', false);
    case LOAD_REVIEWDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ROTATE_CURRENT_REVIEW:
      return state
        .set('current', state.get('reviews')[0])
        .set('reviews', state.get('reviews').slice(1));
    default:
      return state;
  }
}

export default appReducer;
