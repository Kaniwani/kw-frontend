import { handleActions, combineActions } from 'redux-actions';
import update from 'immutability-helper';
import { merge, difference } from 'lodash';

import {
  initialUiState,
  updateUiLoadRequest,
  updateUiLoadSuccess,
  updateUiLoadFailure,
} from 'reducers/utils';

import user from 'features/user/actions';
import vocab from 'features/vocab/actions';

export const initialVocabLevelsUiState = {
  ...initialUiState,
  submitting: [],
};

const addLevelSubmitting = (state, { payload }) =>
  update(state, {
    submitting: { $push: [payload.id] },
  });

const removeLevelSubmitting = (state, { payload }) =>
  update(state, {
    submitting: { $apply: (ids) => difference(ids, [payload.id]) },
  });

export const vocabLevelsUiReducer = handleActions(
  {
    [vocab.levels.load.request]: updateUiLoadRequest,
    [vocab.levels.load.success]: updateUiLoadSuccess,
    [vocab.levels.load.failure]: updateUiLoadFailure,
    [combineActions(vocab.level.lock.request, vocab.level.unlock.request)]: addLevelSubmitting,
    [combineActions(
      vocab.level.lock.success,
      vocab.level.unlock.success,
      vocab.level.lock.failure,
      vocab.level.unlock.failure
    )]: removeLevelSubmitting,
    [combineActions(vocab.level.lock.failure, vocab.level.unlock.failure)]: updateUiLoadFailure,
    [user.logout]: () => initialVocabLevelsUiState,
  },
  initialVocabLevelsUiState
);

export const initialVocabLevelsEntitiesState = {};

const ingestLevels = (state, { payload }) => merge({}, state, payload);

const addLevelReviewIdsToVocabLevel = (state, { payload, meta }) => {
  const noPriorLevelLoaded = state[meta.id] == null;
  // create level entry if not already present
  if (noPriorLevelLoaded) {
    const levelEntity = {
      [meta.id]: {
        level: meta.id,
        count: payload.reviewIds.length,
        isLocked: !payload.reviewIds.length,
        reviews: payload.reviewIds,
      },
    };
    return update(state, { $set: levelEntity });
  }
  return update(state, {
    [meta.id]: { reviews: { $set: payload.reviewIds } },
  });
};

const lockLevel = (state, { payload }) =>
  update(state, {
    [payload.id]: { isLocked: { $set: true }, reviews: { $set: [] } },
  });

const unlockLevel = (state, { payload }) =>
  update(state, {
    [payload.id]: { isLocked: { $set: false } },
  });

export const vocabLevelsReducer = handleActions(
  {
    [vocab.levels.load.success]: ingestLevels,
    [vocab.level.load.success]: addLevelReviewIdsToVocabLevel,
    [vocab.level.lock.success]: lockLevel,
    [vocab.level.unlock.success]: unlockLevel,
    [user.logout]: () => initialVocabLevelsEntitiesState,
  },
  initialVocabLevelsEntitiesState
);
