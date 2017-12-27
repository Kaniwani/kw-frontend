import { handleActions } from 'redux-actions';
import { serializeAnnouncementsResponse } from 'common/serializers';

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

export const ingestAnnouncements = (state, { payload }) => serializeAnnouncementsResponse(payload);

export const announcementsReducer = handleActions(
  {
    [announcements.load.success]: ingestAnnouncements,
  },
  initialEntitiesState
);

export default announcementsReducer;
