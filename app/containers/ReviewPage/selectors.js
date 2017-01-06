import { createSelector } from 'reselect';

/**
 * Direct selector to the review state domain
 */
const selectReviewDomain = () => (state) => state.get('review');

/**
 * Other specific selectors
 */
const selectLoading = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('loading'),
);

const selectError = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('error'),
);

const selectQueue = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('queue'),
);

const selectQueueCount = () => createSelector(
  selectQueue(),
  (queueList) => queueList.size,
);

const selectCompleted = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('completed'),
);

const selectCompletedCount = () => createSelector(
  selectCompleted(),
  (substate) => substate.size,
);

const selectTotalCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('total'),
);

const selectIsReviewSyncNeeded = () => createSelector(
  selectQueueCount(),
  selectCompletedCount(),
  selectTotalCount(),
  (queue, completed, total) => (queue < 10) && (queue + completed < total),
);

const selectIsQueueComplete = () => createSelector(
  selectCompletedCount(),
  selectTotalCount(),
  (completed, total) => completed === total,
);

export default selectReviewDomain;

export {
  selectError,
  selectLoading,
  selectQueue,
  selectCompleted,
  selectQueueCount,
  selectTotalCount,
  selectCompletedCount,
  selectIsReviewSyncNeeded,
  selectIsQueueComplete,
};
