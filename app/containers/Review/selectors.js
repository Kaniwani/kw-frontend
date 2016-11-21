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
  (substate) => substate.get('loading')
);

const selectError = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('error')
);

const selectQueue = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('queue')
);

const selectCurrent = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('current')
);

const selectCurrentVocab = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('vocabulary')
);

const selectCurrentStreak = () => createSelector(
  selectCurrent(),
  (substate) => substate.get('streak')
);

const selectCurrentMeaning = () => createSelector(
  selectCurrent(),
  (substate) => substate.getIn(['vocabulary', 'meaning'])
);

const selectQueueCount = () => createSelector(
  selectQueue(),
  (substate) => substate.size
);

const selectSession = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('session')
);

// TODO: move to ReviewHeader selectors ?
const selectCompletedCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('completed').size
);

const selectCorrectCount = () => createSelector(
  selectSession(),
  (substate) => substate.get('correct')
);

const selectIncorrectCount = () => createSelector(
  selectSession(),
  (substate) => substate.get('incorrect')
);

const selectAnsweredCount = () => createSelector(
  selectCorrectCount(),
  selectIncorrectCount(),
  (correct, incorrect) => correct + incorrect
);

const selectTotalCount = () => createSelector(
  selectReviewDomain(),
  (substate) => substate.get('total')
);

export {
  selectReviewDomain,
  selectError,
  selectLoading,
  selectQueue,
  selectCurrent,
  selectCurrentVocab,
  selectCurrentMeaning,
  selectCurrentStreak,
  selectQueueCount,
  selectTotalCount,
  selectCompletedCount,
  selectAnsweredCount,
  selectCorrectCount,
  selectIncorrectCount,
};
