import { createSelector } from 'reselect';

/**
 * Direct selector to the summaryPage state domain
 */
const selectSummaryPageDomain = () => (state) => state.get('summaryPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SummaryPage
 */

const selectSummaryPage = () => createSelector(
  selectSummaryPageDomain(),
  (substate) => substate.toJS()
);

export default selectSummaryPage;
export {
  selectSummaryPageDomain,
};
