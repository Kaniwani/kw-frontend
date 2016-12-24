/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

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

const selectUser = () => createSelector(
  selectGlobal(),
  (globalState) => globalState.get('user'),
);

const selectAddSynonym = () => createSelector(
  selectAddSynonym(),
  (globalState) => globalState.get('addSynonym'),
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
  selectModal,
  selectAddSynonym,
  selectSettings,
};
