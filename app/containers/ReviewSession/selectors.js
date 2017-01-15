import { createSelector } from 'reselect';
import { getDetailLevelName, getStreakName } from './utils';
import { selectReviews, selectSession } from 'containers/App/selectors';
import selectReviewDomain from 'containers/ReviewPage/selectors';

export const selectQueue = createSelector(
  selectSession,
  (session) => session.queue,
);

export const selectQueueCount = createSelector(
  selectQueue,
  (queue) => queue.size,
);

export const selectComplete = createSelector(
  selectSession,
  (session) => session.complete,
);

export const selectCompleteCount = createSelector(
  selectComplete,
  (complete) => complete.size,
);

export const selectTotalCount = createSelector(
  selectSession,
  (session) => session.total,
);

export const selectIsReviewSyncNeeded = createSelector(
  selectQueueCount,
  selectCompleteCount,
  selectTotalCount,
  (queue, complete, total) => (queue < 10) && (queue + complete < total),
);

export const selectIsQueueComplete = createSelector(
  selectCompleteCount,
  selectTotalCount,
  (complete, total) => complete === total,
);

export const selectCurrentId = createSelector(
  selectSession,
  (session) => session.currentId,
);

export const selectCurrent = createSelector(
  [selectReviews, selectCurrentId],
  (reviews, id) => reviews.get(id),
);

export const selectCurrentIsCorrect = createSelector(
  [selectCurrent],
  ({ session }) => session.correct >= 1,
);

export const selectCurrentIsFirsTimeIncorrect = createSelector(
  [selectCurrent],
  ({ session }) => session.correct === 0 && session.incorrect <= 1,
);

export const selectCurrentIsPreviouslyIncorrect = createSelector(
  [selectCurrent],
  ({ session }) => session.incorrect > 1,
);

export const selectCurrentStreak = createSelector(
  [selectCurrent],
  ({ session }) => session.streak,
);

export const selectCurrentStreakName = createSelector(
  [selectCurrentStreak],
  (streak) => getStreakName(streak),
);

export const selectCorrectCount = createSelector(
  selectSession,
  (session) => session.correct.size,
);

export const selectIncorrectCount = createSelector(
  selectSession,
  (session) => session.incorrect.size,
);

export const selectAnsweredCount = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  (correct, incorrect) => correct + incorrect,
);

export const selectQueueOffset = createSelector(
  [selectTotalCount, selectQueueCount, selectAnsweredCount],
  (total, queue, answered) => total - (queue + answered),
);

export const selectPanels = createSelector(
  selectReviewDomain,
  (review) => review.panels,
);
export const selectPanelToShow = createSelector(
  [selectPanels],
  (panels) => panels.show,
);

export const selectInfoDetailName = createSelector(
  selectPanels,
  (panels) => getDetailLevelName(panels.info.detail),
);

export const selectAnswer = createSelector(
  selectReviewDomain,
  (review) => review.answer,
);

export const selectAnswerInput = createSelector(
  selectAnswer,
  (answer) => answer.input,
);

export const selectAnswerType = createSelector(
  selectAnswer,
  (answer) => answer.type,
);

export const selectAnswerMarked = createSelector(
  selectAnswer,
  (answer) => answer.marked,
);
