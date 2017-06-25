import { createSelector } from 'reselect';

// Direct selector to the sessionSummaryPage state domain
const selectSessionSummaryPageDomain = () => (state) => state.sessionSummaryPage;

// Main selector used by SessionSummaryPage
const makeSelectSessionSummaryPage = () => createSelector(
  selectSessionSummaryPageDomain(),
  (substate) => substate
);

// Other specific selectors


export default selectSessionSummaryPageDomain;
export {
  makeSelectSessionSummaryPage,
};
