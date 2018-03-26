import { handleActions } from 'redux-actions';

import {
  initialUiState,
  updateUiLoadRequest,
  updateUiLoadSuccess,
  updateUiLoadFailure,
} from 'reducers/utils';

import user from 'features/user/actions';
export const initialUserState = {};

export const userUiReducer = handleActions(
  {
    [user.load.request]: updateUiLoadRequest,
    [user.load.success]: updateUiLoadSuccess,
    [user.load.failure]: updateUiLoadFailure,
    [user.logout]: () => initialUiState,
  },
  initialUiState
);

export const initialQuizCountsState = {};

export const quizCountsReducer = handleActions(
  {
    [user.quizCounts.success]: (state, { payload }) => payload,
  },
  initialQuizCountsState
);

export const userReducer = handleActions(
  {
    [user.load.success]: (state, { payload }) => payload,
    [user.logout]: () => initialUserState,
  },
  initialUserState
);

export default userReducer;
