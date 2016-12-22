/*
 * Review Reducer
 */
import { fromJS } from 'immutable';
import * as Review from './constants';
import reviewSessionReducer, { reviewSessionInitialState } from 'containers/ReviewSession/reducer';
import * as ReviewSession from 'containers/ReviewSession/constants';
import * as ReviewAnswer from 'containers/ReviewAnswer/constants';
import * as AnswerInput from 'containers/AnswerInput/constants';
import * as ReviewInfo from 'containers/ReviewInfo/constants';

// FIXME: this is duplication constants/actions so they have to be added twice
// Craziness! just pull all of reviewsession into here please

export const initialState = fromJS({
  loading: false,
  error: false,
  total: 1,
  queue: [],
  completed: [],
  session: reviewSessionInitialState,
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
    case ReviewSession.RECORD_ANSWER:
    case ReviewSession.RECORD_ANSWER_SUCCESS:
    case ReviewSession.RECORD_ANSWER_FAILURE:
    case ReviewSession.SET_NEW_CURRENT:
    case ReviewSession.RETURN_CURRENT_TO_QUEUE:
    case ReviewSession.COPY_CURRENT_TO_COMPLETED:
    case ReviewSession.INCREASE_SESSION_CORRECT:
    case ReviewSession.INCREASE_SESSION_INCORRECT:
    case ReviewSession.INCREASE_CURRENT_STREAK:
    case ReviewSession.DECREASE_CURRENT_STREAK:
    case ReviewSession.RESET_CURRENT_STREAK:
    case ReviewAnswer.MARK_CORRECT:
    case ReviewAnswer.MARK_INCORRECT:
    case ReviewAnswer.MARK_IGNORED:
    case ReviewAnswer.RESET_ANSWER:
    case ReviewAnswer.UPDATE_ANSWER:
    case AnswerInput.UPDATE_INPUT:
    case ReviewInfo.TOGGLE_VOCAB_INFO:
    case ReviewInfo.TOGGLE_VOCAB_INFO_DEPTH:
    case ReviewInfo.SHOW_VOCAB_INFO:
    case ReviewInfo.HIDE_VOCAB_INFO:
      return state.merge(reviewSessionReducer(state, action));
    default:
      return state;
  }
}

export default reviewReducer;
