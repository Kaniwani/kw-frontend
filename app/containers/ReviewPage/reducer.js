/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import * as Review from './constants';
// import reviewSessionReducer from 'containers/ReviewSession/reducer';

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
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
    // case ReviewSession.RECORD_ANSWER: return state; // TODO: implement
    // case ReviewSession.RECORD_ANSWER_SUCCESS: return state; // TODO: implement
    // case ReviewSession.RECORD_ANSWER_FAILURE: return state; // TODO: implement
    // case ReviewSession.SET_NEW_CURRENT: {
    //   const sampleIndex = Math.floor(Math.random() * state.get('queue').size); // between 0 and reviews.length - 1
    //   const newCurrent = state.getIn(['queue', sampleIndex]) || null;
    //   const remainingReviews = state.get('queue').delete(sampleIndex);
    //   return state
    //     .set('current', fromJS(newCurrent))
    //     .set('queue', fromJS(remainingReviews));
    // }
    // case ReviewSession.RETURN_CURRENT_TO_QUEUE: {
    //   const reviews = state.get('queue');
    //   const current = state.get('current');
    //   return state.set('queue', reviews.push(current));
    // }
    // case ReviewSession.COPY_CURRENT_TO_COMPLETED: {
    //   const completed = state.get('completed').push(state.get('current'));
    //   return state.set('completed', completed);
    // }
    // case ReviewAnswer.MARK_CORRECT:
    //   return state
    //     .updateIn(['current', 'session', 'correct'], increment)
    //     .mergeIn(['answer'], { marked: true, inputDisabled: true });
    // case ReviewAnswer.MARK_INCORRECT:
    //   return state
    //     .updateIn(['current', 'session', 'incorrect'], increment)
    //     .mergeIn(['answer'], { marked: true, inputDisabled: true });
    // case ReviewAnswer.MARK_IGNORED:
    //   // When we marked correct or incorrect, we increased the current>session item's correctness
    //   // here we will undo that since the user is ignoring their answer
    //   return state
    //     .updateIn(['session', 'ignored'], increment)
    //     .updateIn(['current', 'session', action.payload ? 'correct' : 'incorrect'], decrement)
    //     .updateIn(['current', 'session', 'ignored'], increment);
    // case ReviewSession.INCREASE_SESSION_CORRECT:
    //   return state.updateIn(['session', 'correct'], increment);
    // case ReviewSession.INCREASE_SESSION_INCORRECT:
    //   return state.updateIn(['session', 'incorrect'], increment);
    // case ReviewSession.INCREASE_CURRENT_STREAK:
    //   return state.updateIn(['current', 'session', 'streak'], increment);
    // case ReviewSession.DECREASE_CURRENT_STREAK:
    //   return state.updateIn(['current', 'session', 'streak'], decrement);
    // case ReviewSession.RESET_CURRENT_STREAK:
    //   return state.setIn(['current', 'session', 'streak'], state.getIn(['current', 'history', 'streak']));
    // case ReviewAnswer.RESET_ANSWER:
    //   return state.set('answer', answerInitialState);
    // case ReviewAnswer.UPDATE_ANSWER:
    //   return state.mergeIn(['answer'], action.payload);
    // case AnswerInput.UPDATE_INPUT:
    //   return state.mergeIn(['answer'], answerInputReducer(state.get('answer'), action));
    // case ReviewInfo.TOGGLE_VOCAB_INFO:
    // case ReviewInfo.SHOW_VOCAB_INFO:
    // case ReviewInfo.HIDE_VOCAB_INFO:
    //   return state.mergeIn(['reviewInfo'], reviewInfoReducer(state.get('reviewInfo'), action));
    default:
      return state;
  }
}

export default reviewReducer;
