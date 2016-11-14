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

const initialState = fromJS({
  loading: false,
  error: false,
  reviews: false,
  current: false,
  progress: {},
});

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWDATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('reviews', false);
    case LOAD_REVIEWDATA_SUCCESS: {
      const reviews = action.reviews;
      return state
        .set('current', reviews.shift())
        .set('reviews', reviews)
        .set('progress', {
          remaining: reviews.length,
          completed: 0,
          correct: 0,
          incorrect: 0,
          ignored: 0,
        })
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false);
    case ROTATE_CURRENT_REVIEW: {
      const reviews = state.get('reviews');
      return state
        .set('current', reviews.shift())
        .set('reviews', reviews)
        .set('remaining', reviews.length);
    }
    default:
      return state;
  }
}

export default reviewReducer;
