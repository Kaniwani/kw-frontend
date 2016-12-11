/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import randInRange from 'utils/randInRange';
import { add, subtract } from './utils';
import answerInputReducer, { answerInitialState } from 'containers/AnswerInput/reducer';
import reviewInfoReducer, { reviewInfoInitialState } from 'containers/ReviewInfo/reducer';
import * as AnswerInput from 'containers/AnswerInput/constants';
import * as ReviewAnswer from 'containers/ReviewAnswer/constants';
import * as ReviewInfo from 'containers/ReviewInfo/constants';
import * as Review from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  reviewInfo: reviewInfoInitialState,
  answer: answerInitialState,
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
    case Review.LOAD_REVIEWDATA:
      return state
        .set('loading', true)
        .set('error', false);
    case Review.LOAD_REVIEWDATA_SUCCESS: {
      const { count, reviews } = action.payload;
      return state
        .set('total', count)
        .set('queue', state.get('queue').concat(reviews))
        .set('loading', false);
    }
    case Review.LOAD_REVIEWDATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
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
    case ReviewAnswer.MARK_IGNORED:
      // When we marked correct or incorrect, we increased the current>session item's correctness
      // here we will undo that since the user is ignoring their answer
      return state
        .updateIn(['session', 'ignored'], add(1))
        .updateIn(['current', 'session', action.payload ? 'correct' : 'incorrect'], subtract(1))
        .updateIn(['current', 'session', 'ignored'], add(1));
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
    case ReviewAnswer.UPDATE_ANSWER:
      return state.mergeIn(['answer'], action.payload);
    case AnswerInput.UPDATE_INPUT:
      return state.mergeIn(['answer'], answerInputReducer(state.get('answer'), action));
    case ReviewInfo.TOGGLE_VOCAB_INFO:
    case ReviewInfo.SHOW_VOCAB_INFO:
    case ReviewInfo.HIDE_VOCAB_INFO:
      return state.mergeIn(['reviewInfo'], reviewInfoReducer(state.get('reviewInfo'), action));
    default:
      return state;
  }
}

export default reviewReducer;
