/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import { increment, decrement } from './utils';
import answerInputReducer, { answerInitialState } from 'containers/AnswerInput/reducer';
import reviewInfoReducer, { reviewInfoInitialState } from 'containers/ReviewInfo/reducer';
import * as ReviewAnswer from 'containers/ReviewAnswer/constants';
import * as AnswerInput from 'containers/AnswerInput/constants';
import * as ReviewInfo from 'containers/ReviewInfo/constants';
import * as ReviewSession from './constants';

// All nested under state.get('session')
export const reviewSessionInitialState = fromJS({
  shortcutsEnabled: false, // FIME: action, constant, usage in shortcut handling function
  correct: 0,
  incorrect: 0,
  ignored: 0,
  reviewInfo: reviewInfoInitialState,
  answer: answerInitialState,
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

function reviewSessionReducer(state = reviewSessionInitialState, action) {
  switch (action.type) {
    // FIXME: loading:true is problematic when loading additional reviews, perhaps we can simply check for meaning && queue in review component to see if we need to show a loading symbol?
    case ReviewSession.RECORD_ANSWER: return state; // TODO: implement
    case ReviewSession.RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    case ReviewSession.RECORD_ANSWER_FAILURE: return state; // TODO: implement

    // FIXME: Move anything not referencing (['session', 'blah']) to reviewPage reducer so we can skip getIn(['session'])
    // Should not be reaching UP out of the component, ewww
    case ReviewSession.SET_NEW_CURRENT: {
      const sampleIndex = Math.floor(Math.random() * state.get('queue').size); // between 0 and reviews.length - 1
      const newCurrent = state.getIn(['queue', sampleIndex]) || null;
      const remainingReviews = state.get('queue').delete(sampleIndex);
      return state
        .setIn(['session', 'current'], fromJS(newCurrent))
        .set('queue', fromJS(remainingReviews));
    }
    case ReviewSession.RETURN_CURRENT_TO_QUEUE: {
      const reviews = state.get('queue');
      const current = state.getIn(['session', 'current']);
      return state.set('queue', reviews.push(current));
    }
    case ReviewSession.COPY_CURRENT_TO_COMPLETED: {
      const completed = state.get('completed').push(state.getIn(['session', 'current']));
      return state.set('completed', completed);
    }
    case ReviewAnswer.MARK_CORRECT:
      return state
        .updateIn(['session', 'current', 'session', 'correct'], increment)
        .mergeIn(['session', 'answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_INCORRECT:
      return state
        .updateIn(['session', 'current', 'session', 'incorrect'], increment)
        .mergeIn(['session', 'answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_IGNORED:
      // When we marked correct or incorrect, we increased the current>session item's correctness
      // here we will undo that since the user is ignoring their answer
      return state
        .updateIn(['session', 'ignored'], increment)
        .updateIn(['session', 'current', 'session', action.payload ? 'correct' : 'incorrect'], decrement)
        .updateIn(['session', 'current', 'session', 'ignored'], increment);
    case ReviewSession.INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], increment);
    case ReviewSession.INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], increment);
    case ReviewSession.INCREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], increment);
    case ReviewSession.DECREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], decrement);
    case ReviewSession.RESET_CURRENT_STREAK:
      return state.setIn(['session', 'current', 'session', 'streak'], state.getIn(['session', 'current', 'history', 'streak']));
    case ReviewAnswer.RESET_ANSWER:
      return state.setIn(['session', 'answer'], answerInitialState);
    case ReviewAnswer.UPDATE_ANSWER:
      return state.mergeIn(['session', 'answer'], action.payload);
    case AnswerInput.UPDATE_INPUT:
      return state.mergeIn(['session', 'answer'], answerInputReducer(state.getIn(['session', 'answer']), action));
    case ReviewInfo.TOGGLE_VOCAB_INFO:
    case ReviewInfo.SHOW_VOCAB_INFO:
    case ReviewInfo.HIDE_VOCAB_INFO:
      return state.mergeIn(['session', 'reviewInfo'], reviewInfoReducer(state.getIn(['session', 'reviewInfo']), action));
    default:
      return state;
  }
}

export default reviewSessionReducer;
