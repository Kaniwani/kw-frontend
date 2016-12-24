import { fromJS } from 'immutable';
import * as Review from './constants';
import { add, subtract, getDecreasedStreak } from './utils';
import answerInputReducer, { answerInitialState } from 'containers/AnswerInput/reducer';
import reviewInfoReducer, { reviewInfoInitialState } from 'containers/ReviewInfo/reducer';
import * as ReviewAnswer from 'containers/ReviewAnswer/constants';
import * as ReviewInfo from 'containers/ReviewInfo/constants';
import * as ReviewSession from 'containers/ReviewSession/constants';
import * as AnswerInput from 'containers/AnswerInput/constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  session: {
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
        synonyms: [],
      },
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
      const reviews = action.payload.reviews
        .filter(({ id }) => !completedIDs.includes(id) && !queueIDs.includes(id) && id !== currentID);

      return state
        .set('total', action.payload.count)
        .set('loading', false)
        .mergeIn(['queue'], fromJS(reviews));
    }
    case Review.LOAD_REVIEWDATA_ERROR:
      return state
        .set('error', action.payload)
        .set('loading', false);

    case ReviewSession.RECORD_ANSWER: return state; // TODO: implement
    case ReviewSession.RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    case ReviewSession.RECORD_ANSWER_FAILURE: return state; // TODO: implement

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
        .updateIn(['session', 'current', 'session', 'correct'], add(1))
        .mergeIn(['session', 'answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_INCORRECT:
      return state
        .updateIn(['session', 'current', 'session', 'incorrect'], add(1))
        .mergeIn(['session', 'answer'], { marked: true, inputDisabled: true });
    case ReviewAnswer.MARK_IGNORED:
      // When we marked correct or incorrect, we increased the current>session item's correctness
      // here we will undo that since the user is ignoring their answer
      return state
        .updateIn(['session', 'ignored'], add(1))
        .updateIn(['session', 'current', 'session', action.payload ? 'correct' : 'incorrect'], subtract(1))
        .updateIn(['session', 'current', 'session', 'ignored'], add(1));
    case ReviewSession.INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], add(1));
    case ReviewSession.INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], add(1));
    case ReviewSession.INCREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], add(1));
    case ReviewSession.DECREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], getDecreasedStreak);
    case ReviewSession.RESET_CURRENT_STREAK:
      return state.setIn(['session', 'current', 'session', 'streak'], state.getIn(['session', 'current', 'history', 'streak']));
    case ReviewAnswer.RESET_ANSWER:
      return state.setIn(['session', 'answer'], answerInitialState);
    case ReviewAnswer.UPDATE_ANSWER:
      return state.mergeIn(['session', 'answer'], action.payload);
    case AnswerInput.UPDATE_INPUT:
      return state.mergeIn(['session', 'answer'], answerInputReducer(state.getIn(['session', 'answer']), action));
    case ReviewInfo.TOGGLE_INFO_PANELS:
    case ReviewInfo.TOGGLE_NEW_SYNONYM_PANEL:
    case ReviewInfo.TOGGLE_INFO_DEPTH:
      return state.mergeIn(['session', 'reviewInfo'], reviewInfoReducer(state.getIn(['session', 'reviewInfo']), action));
    default:
      return state;
  }
}

export default reviewReducer;
