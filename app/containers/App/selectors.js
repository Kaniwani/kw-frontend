import { createSelector } from 'reselect';

const selectGlobal = (state) => state.global;

const makeSelectLoading = () => createSelector(
  (state) => state.loading
);

const makeSelectError = () => createSelector(
  (state) => state.error
);

export {
  selectGlobal,
  makeSelectLoading,
  makeSelectError,
};
