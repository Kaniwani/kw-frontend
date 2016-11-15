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
    remaining: 0,
    correct: 0,
    incorrect: 0,
    completed: 0,
    ignored: 0,
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
      const { reviews } = action;
      return state
        .mergeIn(['current'], reviews.shift())
        .mergeDeepIn(['reviews'], reviews)
        .setIn(['progress', 'remaining'], reviews.length)
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case ROTATE_CURRENT_REVIEW: {
      const modifiedState = state.mergeIn(['current'], state.get('reviews').first())
                            .deleteIn(['reviews', 0]);
      return modifiedState.setIn(['progress', 'remaining'], modifiedState.get('reviews').size);
    }
    default:
      return state;
  }
}

export default reviewReducer;
