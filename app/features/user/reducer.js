import { handleActions } from 'redux-actions';
import { serializeUserResponse } from 'common/serializers';

import {
  initialUiState,
  updateUiLoadRequest,
  updateUiLoadSuccess,
  updateUiLoadFailure,
} from 'reducers/utils';

import { user } from 'features/user/actions';

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

export const ingestUser = (state, { payload }) => serializeUserResponse(payload);

export const userReducer = handleActions(
  {
    [user.load.success]: ingestUser,
    [user.logout]: () => initialUserState,
  },
  initialUserState
);

export default userReducer;
