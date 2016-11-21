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
import randInRange from 'utils/randInRange';
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
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
  INCREASE_STREAK,
  DECREASE_STREAK,
} from './constants';


export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  session: {
    correct: 0,
    incorrect: 0,
    ignored: 0,
  },
  // TODO: suggest to tadgh to send only necessary review item fields to keep api response size smaller
  current: {
    streak: 0,
    vocabulary: {
      meaning: '',
    },
  },
});

const add = (a) => (b) => a + b;
const subtract = (a) => (b) => a - b;

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
        .set('queue', state.get('queue').concat(reviews))
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.error)
        .set('loading', false);
    }
    case SET_NEW_CURRENT: {
      const newCurrent = state.get('queue').first();
      const remainingReviews = state.get('queue').rest();
      return state
        .set('current', fromJS(newCurrent))
        .set('queue', fromJS(remainingReviews));
    }
    case RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('queue');
      const current = state.get('current');
      const newIndex = randInRange(1, reviews.size);
      return state.set('queue', reviews.insert(newIndex, current));
    }
    case MOVE_CURRENT_TO_COMPLETED: {
      const completed = state.get('completed').push(state.get('current'));
      return state.set('completed', completed);
    }
    case MARK_CORRECT:
      return state.updateIn(['current', 'session', 'correct'], add(1));
    case MARK_INCORRECT:
      return state.updateIn(['current', 'session', 'incorrect'], add(1));
    case MARK_IGNORED:
      return state
        .updateIn(['session', 'ignored'], add(1))
        .updateIn(['current', 'session', 'ignored'], add(1));
    case INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], add(1));
    case INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], add(1));
    case INCREASE_STREAK:
      return state.updateIn(['current', 'streak'], add(1));
    case DECREASE_STREAK:
      return state.updateIn(['current', 'streak'], subtract(1));
    default:
      return state;
  }
}

export default reviewReducer;
