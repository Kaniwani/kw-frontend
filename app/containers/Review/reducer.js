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
  // TODO: cut down to only relevant fields
  // TODO: suggest to tadgh to send less data to keep response size smaller
  current: {
    id: 0,
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
    streak: 0,
    last_studied: '2016-09-24T04:17:25.128478Z',
    needs_review: true,
    unlock_date: '2016-09-17T01:17:04.682953Z',
    next_review_date: '2016-09-24T08:30:00.145429Z',
    burned: false,
    hidden: false,
    wanikani_srs: 'burned',
    wanikani_srs_numeric: 9,
    wanikani_burned: true,
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
      const { results: reviews, count } = action.reviewData; // vanillajs obj
      return state
        .setIn(['progress', 'initial'], count)
        .mergeIn(['current'], reviews.shift())
        .setIn(['progress', 'remaining'], count)
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
        .updateIn(['progress', 'remaining'], (num) => num > 0 ? num - 1 : 0);
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
