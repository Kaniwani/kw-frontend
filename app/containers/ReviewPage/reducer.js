/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
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
    session: {
      streak: 0,
    },
    vocabulary: {
      meaning: '',
      readings: [],
    },
  },
});

function reviewReducer(state = initialState, action) {
  switch (action.type) {
    // FIXME: loading:true is problematic when loading additional reviews, perhaps we can simply check for meaning && queue in review component to see if we need to show a loading symbol?
    case Review.LOAD_REVIEWDATA:
      return state
        .set('loading', true)
        .set('error', false);
    case Review.LOAD_REVIEWDATA_SUCCESS: {
      // FIXME: these checks should be unneccesary if we're paginating getReviews correctly
      const completedIDs = state.get('completed').map((x) => x.get('id'));
      const queueIDs = state.get('queue').map((x) => x.get('id'));
      const currentID = state.getIn(['current', 'id']);
      const reviews = action.payload.reviews.filter(({ id }) => !completedIDs.includes(id) && !queueIDs.includes(id) && id !== currentID);
      return state
        .set('total', action.payload.count)
        .set('loading', false)
        .mergeIn(['queue'], fromJS(reviews));
    }
    case Review.LOAD_REVIEWDATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);
    case Review.RECORD_ANSWER: return state; // TODO: implement
    case Review.RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    case Review.RECORD_ANSWER_FAILURE: return state; // TODO: implement
    case Review.SET_NEW_CURRENT: {
      const sampleIndex = Math.floor(Math.random() * state.get('queue').size); // between 0 and reviews.length - 1
      const newCurrent = state.getIn(['queue', sampleIndex]) || null;
      const remainingReviews = state.get('queue').delete(sampleIndex);
      return state
        .set('current', fromJS(newCurrent))
        .set('queue', fromJS(remainingReviews));
    }
    case Review.RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('queue');
      const current = state.get('current');
      return state.set('queue', reviews.push(current));
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
        // .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'session', 'streak'], add(1));
    case Review.DECREASE_CURRENT_STREAK:
      return state
        // .setIn(['current', 'previousStreak'], action.payload)
        .updateIn(['current', 'session', 'streak'], subtract(1));
    case Review.RESET_CURRENT_STREAK:
      return state.setIn(['current', 'session', 'streak'], state.getIn(['current', 'history', 'streak']));
    case ReviewAnswer.RESET_ANSWER:
      return state.set('answer', answerInitialState);
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
