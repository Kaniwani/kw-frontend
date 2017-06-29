import { createSelector } from 'reselect';

const selectGlobal = (state) => state.global;

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (state) => state.loading
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (state) => state.error
);

const makeSelectUser = () => createSelector(
  selectGlobal,
  (state) => state.user
);

const makeSelectDashboard = () => createSelector(
  selectGlobal,
  (state) => state.dashboard
);

const makeSelectSettings = () => createSelector(
  selectGlobal,
  (state) => state.settings
);

const makeSelectReviews = () => createSelector(
  selectGlobal,
  (state) => state.settings
);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectUser,
  makeSelectDashboard,
  makeSelectSettings,
  makeSelectReviews,
};
