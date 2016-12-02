/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import randInRange from 'utils/randInRange';
import { isKanjiKana } from 'shared/kanawana/core';
import { UPDATE_INPUT } from 'containers/AnswerInput/constants';
import answerInputReducer from 'containers/AnswerInput/reducer';

// TODO: add to ReviewAnswer reducer and import that to handle these
import {
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
  CHECK_ANSWER,
//  PROCESS_ANSWER,
} from 'containers/ReviewAnswer/constants';

import {
  add,
  subtract,
  answerMatches,
} from './utils';

import {
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_ERROR,
  RECORD_ANSWER,
  RECORD_ANSWER_SUCCESS,
  RECORD_ANSWER_FAILURE,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
  INCREASE_CURRENT_STREAK,
  DECREASE_CURRENT_STREAK,
  RESET_CURRENT_STREAK,
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  answer: {
    inputText: '',
    inputDisabled: false,
    valid: null,
    marked: false,
    matches: false,
  },
  session: {
    correct: 0,
    incorrect: 0,
    ignored: 0,
  },
  // TODO: suggest to tadgh to send only necessary review item fields to keep api response size smaller
  current: {
    streak: 0,
    previousStreak: null,
    vocabulary: {
      meaning: '',
      readings: [],
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
      const { count, reviews } = action.payload;
      return state
        .set('total', count)
        .set('queue', state.get('queue').concat(reviews))
        .set('loading', false);
    }
    case LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.payload)
        .set('loading', false);
    }
    case RECORD_ANSWER: return state; // TODO: implement
    case RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    case RECORD_ANSWER_FAILURE: return state; // TODO: implement
    case SET_NEW_CURRENT: {
      const newCurrent = state.get('queue').first();
      const remainingReviews = state.get('queue').rest();
      return state
        .set('answer', fromJS({
          inputText: '',
          matches: false,
          valid: null,
          marked: false,
          inputDisabled: false,
        }))
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
      return state
        .updateIn(['current', 'session', 'correct'], add(1))
        .mergeIn(['answer'], { marked: true, inputDisabled: true });
    case MARK_INCORRECT:
      return state
        .updateIn(['current', 'session', 'incorrect'], add(1))
        .mergeIn(['answer'], { marked: true, inputDisabled: true });
    case MARK_IGNORED: {
      // When we marked correct or incorrect, we increased the current>session item's correctness
      // here we will undo that since the user is ignoring their answer
      const resetTarget = action.payload ? 'correct' : 'incorrect';
      return state
        .updateIn(['session', 'ignored'], add(1))
        .updateIn(['current', 'session', resetTarget], subtract(1))
        .updateIn(['current', 'session', 'ignored'], add(1));
    }
    case INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], add(1));
    case INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], add(1));
    case INCREASE_CURRENT_STREAK:
      return state
        .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'streak'], add(1));
    case DECREASE_CURRENT_STREAK:
      return state
        .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'streak'], subtract(1));
    case RESET_CURRENT_STREAK:
      return state.setIn(['current', 'streak'], state.getIn(['current', 'previousStreak']));
    case UPDATE_INPUT:
      return answerInputReducer(state, action);
    case CHECK_ANSWER: {
      // TODO: move these checks to saga instead
      // special considerations should be handled there, and pass the relevant state changes to reducer?
      const readings = state.getIn(['current', 'vocabulary', 'readings']).toJS();
      const inputText = state.getIn(['answer', 'inputText']).trim();
      return state
        .mergeIn(['answer'], {
          matches: answerMatches(readings, inputText),
          valid: inputText.length > 0 && isKanjiKana(inputText),
        });
    }
    // case PROCESS_ANSWER:
    default:
      return state;
  }
}

export default reviewReducer;
