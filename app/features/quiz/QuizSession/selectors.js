import { createSelector } from 'reselect';

import calculatePercentage from 'common/utils/calculatePercentage';
import getSrsRankName from 'common/utils/getSrsRankName';

import { getVal, getState } from 'common/selectors';

import { selectUserProfile } from 'features/user/selectors';

export const UI_DOMAIN = 'quizSession';
export const selectDomain = getState(UI_DOMAIN);
export const selectCategory = getState([UI_DOMAIN, 'category'], '');
export const selectIsLessonQuiz = createSelector(
  selectCategory,
  (category) => category === 'lessons'
);
export const selectIsReviewQuiz = createSelector(
  selectCategory,
  (category) => category === 'reviews'
);
export const selectQueue = getState([UI_DOMAIN, 'queue'], []);
export const selectCurrent = getState([UI_DOMAIN, 'current'], {});
export const selectCorrectIds = getState([UI_DOMAIN, 'correct'], []);
export const selectIncorrectIds = getState([UI_DOMAIN, 'incorrect'], []);

export const selectQueueCount = createSelector(selectQueue, (queue) => queue.length);
export const selectCurrentId = createSelector(selectCurrent, getState('id'));
export const selectCurrentStreakName = createSelector(
  selectCurrent,
  getVal('streak', getSrsRankName)
);

export const selectSessionCount = createSelector(
  [selectUserProfile, selectCategory],
  (profile, category) => getState(`${category}Count`, 0)(profile)
);

export const selectPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId)
);

export const selectCorrectCount = createSelector(selectDomain, ({ correct }) => correct.length);

export const selectIncorrectCount = createSelector(
  selectDomain,
  ({ incorrect }) => incorrect.length
);

export const selectPercentComplete = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => calculatePercentage(correct, total)
);

export const calculateCorrectPercentage = (correct, incorrect) => {
  const complete = correct + incorrect;
  const pristine = complete < 1;
  return pristine ? 100 : calculatePercentage(correct, complete);
};

export const selectPercentCorrect = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  calculateCorrectPercentage
);

export const selectRemainingCount = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => Math.max(total - correct, 0)
);

export default selectDomain;
