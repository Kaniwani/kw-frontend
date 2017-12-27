import { handleActions } from "redux-actions";
import update from "immutability-helper";

import user from "features/user/actions";
import vocab from "features/vocab/actions";

export const initialVocabLevelUiState = {
  isLoading: [],
  lastLoad: {},
  error: {},
};

const updateUiLoadRequest = (state, { payload }) =>
  update(state, { isLoading: { $push: [payload.id] } });

const updateUiLoadSuccess = (state, { meta }) =>
  update(state, {
    isLoading: (ids) => ids.filter((id) => id !== meta.id),
    lastLoad: (lastLoad) => ({ ...lastLoad, [meta.id]: new Date() }),
    error: { $unset: [meta.id] },
  });

const updateUiLoadFailure = (state, { payload, meta }) =>
  update(state, {
    isLoading: (ids) => ids.filter((id) => id !== meta.id),
    error: (error) => ({ ...error, [meta.id]: payload }),
  });

export const vocabLevelUiReducer = handleActions(
  {
    [vocab.level.load.request]: updateUiLoadRequest,
    [vocab.level.load.success]: updateUiLoadSuccess,
    [vocab.level.load.failure]: updateUiLoadFailure,
    [user.logout]: () => initialVocabLevelUiState,
  },
  initialVocabLevelUiState
);
