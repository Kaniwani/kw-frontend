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

function reviewReducer(state = initialState, action = {}) {
  switch (action.type) {
    case Review.LOAD_REVIEWDATA:
      return state
        .set('loading', action.showIndicator)
        .set('error', false);
    case Review.LOAD_REVIEWDATA_SUCCESS: {
      // FIXME: make queue an Immutable Set()
      return state
        .set('total', action.payload.count)
        .set('loading', false)
        .set('error', false)
        .set('queue', state.get('queue').concat(fromJS(action.payload.reviews)));
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
    /* TODO: these could all just be UPDATE_SESSION with a payload to merge... */
    case ReviewSession.INCREASE_SESSION_CORRECT:
      return state.updateIn(['session', 'correct'], add(1));
    case ReviewSession.INCREASE_SESSION_INCORRECT:
      return state.updateIn(['session', 'incorrect'], add(1));
    /* TODO: these could all just be UPDATE_CURRENT with a payload to merge... */
    case ReviewSession.INCREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], add(1));
    case ReviewSession.DECREASE_CURRENT_STREAK:
      return state.updateIn(['session', 'current', 'session', 'streak'], getDecreasedStreak);
    case ReviewSession.RESET_CURRENT_STREAK:
      return state.setIn(['session', 'current', 'session', 'streak'], state.getIn(['session', 'current', 'history', 'streak']));
    case ReviewSession.ADD_SYNONYM_TO_CURRENT:
      return state.mergeIn(['session', 'current', 'vocabulary', 'synonyms'], [action.payload]);
    case ReviewSession.REMOVE_SYNONYM_FROM_CURRENT: {
      const newSynonyms = state.getIn(['session', 'current', 'vocabulary', 'synonyms'])
        .filter((item) => item.get('id') !== action.payload);
      return state.setIn(['session', 'current', 'vocabulary', 'synonyms'], newSynonyms);
    }
    case ReviewAnswer.RESET_ANSWER:
      return state.setIn(['session', 'answer'], answerInitialState);
    // TODO: uggh... really? too many nested separations with these
    case ReviewAnswer.UPDATE_ANSWER:
      return state.mergeIn(['session', 'answer'], action.payload);
    case AnswerInput.UPDATE_INPUT:
      return state.mergeIn(['session', 'answer'], answerInputReducer(state.getIn(['session', 'answer']), action));
    // TODO: can just move to top level as well... reviewInfo will never live independently of a review...
    case ReviewInfo.TOGGLE_INFO_PANELS:
    case ReviewInfo.TOGGLE_NEW_SYNONYM_PANEL:
    case ReviewInfo.TOGGLE_INFO_DEPTH:
      return state.mergeIn(['session', 'reviewInfo'], reviewInfoReducer(state.getIn(['session', 'reviewInfo']), action));
    default:
      return state;
  }
}

export default reviewReducer;
