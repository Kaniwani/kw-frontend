import { createSelector } from 'reselect';
import selectReviewDomain, {
  selectSession,
} from 'containers/ReviewPage/selectors';


/**
 * Direct selector to the summaryPage state domain
 */
const selectSummaryPageDomain = selectReviewDomain;

/**
 * Other specific selectors
 */

const selectCompleted = () => createSelector(
  selectSummaryPageDomain(),
  (substate) => substate.get('completed'),
);

/**
 * Default selector used by SummaryPage
 */

const selectSummaryPage = () => createSelector(
  selectCompleted(),
  selectSession(),
  (session, completed) => ({ session, completed }),
);

export default selectSummaryPage;
export {
  selectSession,
  selectCompleted,
};
