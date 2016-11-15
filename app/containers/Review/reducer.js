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
  ROTATE_CURRENT_REVIEW,
  INCREASE_COMPLETED_COUNT,
} from './constants';

const initialState = fromJS({
  loading: false,
  error: false,
  reviews: [],
  current: {
    id: 0,
    meaning: '',
    streak: 0,
    readings: [],
    characters: [],
  },
  progress: {
    initial: 0,
    remaining: 0,
    correct: 0,
    incorrect: 0,
    completed: 0,
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
      const { reviews } = action; // js array of objects
      return state
        .setIn(['progress', 'initial'], reviews.length)
        .mergeIn(['current'], reviews.shift())
        .setIn(['progress', 'remaining'], reviews.length)
        .mergeDeepIn(['reviews'], reviews)
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case ROTATE_CURRENT_REVIEW: {
      const reviews = state.get('reviews'); // immutablejs List of Maps
      return state
        .mergeIn(['current'], reviews.first())
        .deleteIn(['reviews', 0])
        .setIn(['progress', 'remaining'], reviews.shift().size);
    }
    case INCREASE_COMPLETED_COUNT: {
      const { completed, initial } = state.get('progress').toJS();
      if (completed + 1 > initial) return state;
      return state.setIn(['progress', 'completed'], completed + 1);
    }
    default:
      return state;
  }
}

export default reviewReducer;
