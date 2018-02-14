import { createSelector } from 'reselect';

import calculatePercentage from 'common/utils/calculatePercentage';
import getSrsRankName from 'common/utils/getSrsRankName';

import { MINIMUM_QUEUE_COUNT } from './constants';

import { getVal, getState } from 'common/selectors';
import { selectUserProfile } from 'features/user/selectors';
import { selectPrimaryVocabId } from 'features/reviews/selectors';
import { selectVocabById } from 'features/vocab/selectors';

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
export const selectCompleteIds = getState([UI_DOMAIN, 'complete'], []);
export const selectRemainingCount = getState([UI_DOMAIN, 'remaining'], null);
export const selectQueueCount = createSelector(selectQueue, getState('length', 0));
export const selectCorrectCount = createSelector(selectCorrectIds, getState('length', 0));
export const selectIncorrectCount = createSelector(selectIncorrectIds, getState('length', 0));
export const selectCompleteCount = createSelector(selectCompleteIds, getState('length', 0));
export const selectSynonymModalOpen = createSelector(selectDomain, getState('synonymModalOpen'));
export const selectCurrentId = createSelector(selectCurrent, getState('id'));
export const selectCurrentStreakName = createSelector(
  selectCurrent,
  getVal('streak', getSrsRankName)
);

export const selectPrimaryVocabFromCurrent = createSelector(
  [selectCurrentId, (state) => state],
  (id, state) => selectVocabById(state, { id: selectPrimaryVocabId(state, { id }) })
);

export const selectSessionCount = createSelector(
  [selectUserProfile, selectCategory],
  (profile, category) => getState(`${category}Count`, 0)(profile)
);

export const selectSessionRemainingCount = createSelector(
  [selectSessionCount, selectRemainingCount, selectCompleteCount],
  (sessionCount, remainingCount, completeCount) =>
    // we may not have loaded a queue yet, so start with sessionCount
    remainingCount == null ? sessionCount : remainingCount - completeCount
);

export const selectSessionFinished = createSelector(
  [selectCurrentId, selectQueue],
  (id, queue) => !!id && !queue.length
);

export const selectCurrentPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId)
);

export const selectPercentComplete = createSelector(
  [selectCompleteCount, selectSessionRemainingCount],
  (complete, remaining) => calculatePercentage(complete, complete + remaining)
);

// FIXME: same as summary selector = extract transform function somewhere common
export const selectPercentCorrect = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  (correct, incorrect) => {
    const total = correct + incorrect;
    const pristine = total < 1;
    return pristine ? 100 : calculatePercentage(correct, total);
  }
);

export const selectQueueNeeded = createSelector(
  [selectQueueCount, selectSessionRemainingCount],
  (queueCount, remaining) => {
    const isQueueNeeded = queueCount < MINIMUM_QUEUE_COUNT && queueCount < remaining;
    console.log({
      queueCount,
      MINIMUM_QUEUE_COUNT,
      remaining,
      isQueueNeeded,
    });
    return isQueueNeeded;
  }
);

export default selectDomain;
