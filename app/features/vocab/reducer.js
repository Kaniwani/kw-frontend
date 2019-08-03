import { handleActions, combineActions } from 'redux-actions';
// import update from "immutability-helper";
import { merge } from 'lodash';
import quiz from 'features/quiz/actions';
import review from 'features/reviews/actions';
import user from 'features/user/actions';
import vocab from './actions';

export const initialVocabEntitiesState = {};

const ingestVocabs = (state, { payload }) => merge({}, state, payload.vocabById);

export const vocabReducer = handleActions(
  {
    [combineActions(
      vocab.level.load.success,
      quiz.session.queue.load.success,
      review.load.success,
      vocab.batchUpdate
    )]: ingestVocabs,
    [user.logout]: () => initialVocabEntitiesState,
  },
  initialVocabEntitiesState
);

export default vocabReducer;
