import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, omit } from 'lodash';

import user from 'features/user/actions';
import vocab from 'features/vocab/actions';
import review from 'features/reviews/actions';
import synonyms from 'features/synonyms/actions';
import quiz from 'features/quiz/actions';

export const initialReviewsEntitiesState = {};

export const ingestReviews = (state, { payload }) => merge({}, state, payload.reviewsById);

export const ingestReview = (state, { payload }) => {
  const entry = omit(payload, ['vocabById', 'synonymsById']);
  return update(state, {
    [payload.id]: { $set: entry },
  });
};

export const updateReview = (state, { payload }) =>
  update(state, {
    [payload.id]: { $set: merge({}, state[payload.id], payload) },
  });

export const updateReviewHiddenStatus = (state, { payload }) =>
  update(state, {
    [payload.id]: { hidden: { $set: payload.hidden } },
  });

export const updateReviewNotes = (state, { payload }) =>
  update(state, {
    [payload.id]: { notes: { $set: payload.notes } },
  });

const addSynonymIdToReview = (state, { payload }) =>
  update(state, {
    [payload.reviewId]: { synonyms: { $push: [payload.id] } },
  });

const removeSynonymIdFromReview = (state, { payload }) =>
  update(state, {
    [payload.reviewId]: { synonyms: (ids) => ids.filter((id) => id !== payload.id) },
  });

export const reviewsReducer = handleActions(
  {
    [combineActions(
      vocab.level.load.success,
      quiz.session.queue.load.success,
      review.batchUpdate
    )]: ingestReviews,
    [review.load.success]: ingestReview,
    [review.update]: updateReview,
    [review.updateNotes.success]: updateReviewNotes,
    [combineActions(review.lock.success, review.unlock.success)]: updateReviewHiddenStatus,
    [synonyms.add.success]: addSynonymIdToReview,
    [synonyms.remove.success]: removeSynonymIdFromReview,
    [user.logout]: () => initialReviewsEntitiesState,
  },
  initialReviewsEntitiesState
);

export default reviewsReducer;
