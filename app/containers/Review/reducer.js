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
  reviews: [],
  completed: [],
  total: 0,
  // TODO: suggest to tadgh to send only these fields to keep api response size smaller
  current: {
    id: null,
    vocabulary: {
      meaning: 'initialState',
      readings: [{
        character: 'initialState',
        kana: 'initialState',
        level: 0,
      }],
    },
    correct: 0,
    incorrect: 0,
    ignored: false,
    streak: 0,
  },
  progress: {
    correct: 0,
    incorrect: 0,
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
      const { count, reviews } = action.data;
      return state
        .set('total', count)
        .mergeIn(['reviews'], reviews)
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case SET_NEW_CURRENT: {
      const newCurrent = state.get('reviews').first();
      const newReviews = state.get('reviews').shift();
      return state
        .set('current', newCurrent)
        .set('reviews', newReviews);
    }
    case RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('reviews');
      const current = state.get('current');
      const newIndex = randInRange(1, reviews.size);
      return state.set('reviews', reviews.insert(newIndex, current));
    }
    case MARK_CORRECT: {
      return state.updateIn(['current', 'correct'], (num) => num + 1);
    }
    case MOVE_CURRENT_TO_COMPLETED: {
      const completed = state.get('completed').push(state.get('current'));
      return state.set('completed', completed);
    }
    case MARK_INCORRECT: {
      return state
        .updateIn(['current', 'incorrect'], (num) => num + 1)
        .updateIn(['progress', 'incorrect'], (num) => num + 1);
    }
    case MARK_IGNORED: {
      return state
        .updateIn(['current', 'ignored'], (num) => num + 1)
        .updateIn(['progress', 'ignored'], (num) => num + 1);
    }
    default:
      return state;
  }
}

export default reviewReducer;
