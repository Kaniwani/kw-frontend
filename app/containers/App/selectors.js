/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import format from 'date-fns/format';
import { MINUTES_SINCE_LAST_SYNC_LIMIT, DATE_IN_WORDS } from 'shared/constants';
import differenceInMinutes from 'date-fns/difference_in_minutes';

const selectGlobal = (state) => state.get('global');
export default selectGlobal;

export const makeSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route
    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

export const selectLoading = createSelector(
  selectGlobal,
  (globalState) => globalState.loading,
);

export const selectError = createSelector(
  selectGlobal,
  (globalState) => globalState.error,
);

export const selectAuthToken = createSelector(
  selectGlobal,
  (globalState) => globalState.token,
);

export const selectUser = createSelector(
  selectGlobal,
  (globalState) => globalState.user,
);

export const selectUserSettings = createSelector(
  selectUser,
  (globalState) => globalState.settings,
);

export const selectReviews = createSelector(
  selectGlobal,
  (globalState) => globalState.reviews,
);

export const selectSession = createSelector(
  selectGlobal,
  (globalState) => globalState.session,
);

export const selectReviewCount = createSelector(
  selectGlobal,
  (substate) => substate.reviewCount,
);

export const selectLastWkSyncDate = createSelector(
  selectUser,
  (substate) => {
    const syncDate = substate.lastWkSyncDate;
    return syncDate != null ? format(syncDate, DATE_IN_WORDS) : '... ¯\\_(ツ)_/¯'; // eslint-disable-line no-useless-escape
  },
);

export const selectLastKwSyncDate = createSelector(
  selectUser,
  (substate) => {
    const syncDate = substate.lastKwSyncDate;
    return syncDate != null ? format(syncDate, DATE_IN_WORDS) : '... ¯\\_(ツ)_/¯'; // eslint-disable-line no-useless-escape
  },
);


// Ideally, this should be linked in with the next reviews countdown timer
export const selectUserSyncNeeded = createSelector(
  [selectLastKwSyncDate, selectReviewCount],
  (lastSync, reviewCount) => {
    if (lastSync == null) return true;
    const needReviews = reviewCount < 1;
    const timeDifference = differenceInMinutes(new Date(), new Date(lastSync));
    const timeLimitElapsed = timeDifference >= MINUTES_SINCE_LAST_SYNC_LIMIT;
    return needReviews || timeLimitElapsed;
  },
);

export const selectReviewSyncNeeded = createSelector(
  [selectLastKwSyncDate, selectReviewCount],
  (lastSync, reviewCount) => {
    if (lastSync == null) return true;
    const needReviews = reviewCount < 1;
    const timeDifference = differenceInMinutes(new Date(), new Date(lastSync));
    const timeLimitElapsed = timeDifference >= MINUTES_SINCE_LAST_SYNC_LIMIT;
    return needReviews || timeLimitElapsed;
  },
);
