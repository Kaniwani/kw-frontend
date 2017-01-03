/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { MINUTES_SINCE_LAST_SYNC_LIMIT } from 'shared/constants';
import differenceInMinutes from 'date-fns/difference_in_minutes';

const selectGlobal = () => (state) => state.get('global');

const selectLocationState = () => {
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

const selectLoading = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('loading'),
);

const selectError = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('error'),
);

const selectModal = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('modal'),
);

const selectAddSynonym = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('addSynonym'),
);

const selectUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('user'),
);

const selectIsSyncNeeded = () => createSelector(
  selectUser(),
  (userState) => {
    const lastSync = userState.get('lastKwSyncDate');
    if (lastSync == null) return true;
    return differenceInMinutes(Date.now(), lastSync) > MINUTES_SINCE_LAST_SYNC_LIMIT;
  },
);

const selectSettings = () => createSelector(
  selectUser(),
  (substate) => substate.get('settings'),
);

export default selectGlobal;

export {
  selectLocationState,
  selectLoading,
  selectError,
  selectUser,
  selectIsSyncNeeded,
  selectModal,
  selectAddSynonym,
  selectSettings,
};
