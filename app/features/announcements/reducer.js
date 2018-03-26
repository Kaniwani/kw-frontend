import { handleActions } from 'redux-actions';

import {
  initialUiState,
  updateUiLoadRequest,
  updateUiLoadSuccess,
  updateUiLoadFailure,
} from 'reducers/utils';

import user from 'features/user/actions';
import announcements from './actions';

export const initialEntitiesState = {};

export const announcementsUiReducer = handleActions(
  {
    [announcements.load.request]: updateUiLoadRequest,
    [announcements.load.success]: updateUiLoadSuccess,
    [announcements.load.failure]: updateUiLoadFailure,
    [user.logout]: () => initialUiState,
  },
  initialUiState
);

export const announcementsReducer = handleActions(
  {
    [announcements.load.success]: (state, { payload }) => payload,
  },
  initialEntitiesState
);

export default announcementsReducer;
