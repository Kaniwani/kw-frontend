/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import randInRange from 'utils/randInRange';
import { add, subtract } from './utils';
import answerInputReducer from 'containers/AnswerInput/reducer';
import modalReducer from 'containers/Modal/reducer';
import * as AnswerInput from 'containers/AnswerInput/constants';
import * as Modal from 'containers/Modal/constants';
import * as ReviewAnswer from 'containers/ReviewAnswer/constants';
import * as ReviewInfo from 'containers/ReviewInfo/constants';
import * as Review from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  reviewInfo: {
    charactersVisible: false,
    kanaVisible: false,
  },
  answer: {
    inputText: '',
    inputDisabled: false,
    valid: null,
    marked: false,
    matches: false,
  },
  modal: {},
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
    case Review.LOAD_REVIEWDATA: {
      return state
        .set('loading', true)
        .set('error', false);
    }
    case Review.LOAD_REVIEWDATA_SUCCESS: {
      const { count, reviews } = action.payload;
      return state
        .set('total', count)
        .set('queue', state.get('queue').concat(reviews))
        .set('loading', false);
    }
    case Review.LOAD_REVIEWDATA_ERROR: {
      return state
        .set('error', action.payload)
        .set('loading', false);
    }
    case Review.RECORD_ANSWER: return state; // TODO: implement
    case Review.RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    case Review.RECORD_ANSWER_FAILURE: return state; // TODO: implement
    case Review.SET_NEW_CURRENT: {
      const newCurrent = state.get('queue').first();
      const remainingReviews = state.get('queue').rest();
      return state
        .mergeIn(['current'], newCurrent)
        .set('queue', remainingReviews);
    }
    case Review.RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('queue');
      const current = state.get('current');
      const newIndex = randInRange(1, reviews.size);
      return state.set('queue', reviews.insert(newIndex, current));
    }
    case Review.COPY_CURRENT_TO_COMPLETED: {
      const completed = state.get('completed').push(state.get('current'));
      return state.set('completed', completed);
    }
    case ReviewAnswer.MARK_CORRECT:
      return state
        .updateIn(['current', 'session', 'correct'], add(1))
        .mergeIn(['answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_INCORRECT:
      return state
        .updateIn(['current', 'session', 'incorrect'], add(1))
        .mergeIn(['answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_IGNORED: {
      // When we marked correct or incorrect, we increased the current>session item's correctness
      // here we will undo that since the user is ignoring their answer
      const resetTarget = action.payload ? 'correct' : 'incorrect';
      return state
        .updateIn(['session', 'ignored'], add(1))
        .updateIn(['current', 'session', resetTarget], subtract(1))
        .updateIn(['current', 'session', 'ignored'], add(1));
    }
    case Review.INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], add(1));
    case Review.INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], add(1));
    case Review.INCREASE_CURRENT_STREAK:
      return state
        .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'streak'], add(1));
    case Review.DECREASE_CURRENT_STREAK:
      return state
        .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'streak'], subtract(1));
    case Review.RESET_CURRENT_STREAK:
      return state.setIn(['current', 'streak'], state.getIn(['current', 'previousStreak']));
    // TODO: return state.set('answer', answerInputReducer(state.get('answer'), action))
    // rather than passing the full state
    case AnswerInput.UPDATE_INPUT:
      return answerInputReducer(state, action);
    case Modal.HIDE_MODAL:
      return state.mergeIn(['modal'], modalReducer(state.get('modal'), action));
    case Modal.SHOW_MODAL:
      return state.mergeIn(['modal'], modalReducer(state.get('modal'), action));
    case ReviewAnswer.UPDATE_ANSWER:
      return state.mergeIn(['answer'], action.payload);
    case ReviewInfo.TOGGLE_VOCAB_INFO:
      return state
        .updateIn(['reviewInfo', 'charactersVisible'], (value) => (action.payload.characters ? !value : value))
        .updateIn(['reviewInfo', 'kanaVisible'], (value) => (action.payload.kana ? !value : value));
    case ReviewInfo.SHOW_VOCAB_INFO:
      return state.mergeIn(['reviewInfo'], {
        charactersVisible: true,
        kanaVisible: true,
      });
    case ReviewInfo.HIDE_VOCAB_INFO:
      return state.mergeIn(['reviewInfo'], {
        charactersVisible: false,
        kanaVisible: false,
      });
    default:
      return state;
  }
}

export default reviewReducer;
