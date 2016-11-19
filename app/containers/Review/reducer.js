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

import { fromJS } from 'immutable';
import {
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from './constants';

import randInRange from 'utils/randInRange';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 0,
  reviews: [],
  completed: [],
  // TODO: suggest to tadgh to send only necessary review item fields to keep api response size smaller
  current: {
    streak: 0,
    vocabulary: {
      meaning: '',
    },
  },
});

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWDATA: {
      return state
        .set('loading', true)
        .set('error', false);
    }
    case LOAD_REVIEWDATA_SUCCESS: {
      const { count, reviews } = action.data;
      return state
        .set('total', count)
        .set('reviews', state.get('reviews').concat(reviews))
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case SET_NEW_CURRENT: {
      const newCurrent = state.get('reviews').first();
      const remainingReviews = state.get('reviews').rest();
      return state
        .set('current', fromJS(newCurrent))
        .set('reviews', fromJS(remainingReviews));
    }
    case RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('reviews');
      const current = state.get('current');
      const newIndex = randInRange(1, reviews.size);
      return state.set('reviews', reviews.insert(newIndex, current));
    }
    case MOVE_CURRENT_TO_COMPLETED: {
      const completed = state.get('completed').push(state.get('current'));
      return state.set('completed', completed);
    }
    case MARK_CORRECT: {
      return state.mergeIn(['current', 'session'], { correct: true });
    }
    case MARK_INCORRECT: {
      return state.mergeIn(['current', 'session'], { incorrect: true });
    }
    case MARK_IGNORED: {
      return state.mergeIn(['current', 'session'], { ignored: true });
    }
    default:
      return state;
  }
}

export default reviewReducer;
