import { createSelector } from 'reselect';

import calculatePercentage from 'common/utils/calculatePercentage';
import getSrsRankName from 'common/utils/getSrsRankName';

import { MINIMUM_QUEUE_COUNT } from './constants';

import { getBy, getState } from 'common/selectors';
import { selectUserProfile } from 'features/user/selectors';
import { selectPrimaryVocabId } from 'features/reviews/selectors';
import { selectVocabById } from 'features/vocab/selectors';

export const UI_DOMAIN = 'quizSession';
export const selectQuizDomain = getState(UI_DOMAIN);
export const selectCategory = getState([UI_DOMAIN, 'category'], '');
export const selectIsLessonQuiz = createSelector(
  selectCategory,
  (category) => category === 'lessons'
);
export const selectIsReviewQuiz = createSelector(
  selectCategory,
  (category) => category === 'reviews'
);
export const selectQueue = createSelector(selectQuizDomain, getState('queue', []));
export const selectWrapUp = createSelector(selectQuizDomain, getState('wrapUp', {}));
export const selectCurrent = createSelector(selectQuizDomain, getState('current', {}));
export const selectCorrectIds = createSelector(selectQuizDomain, getState('correct', []));
export const selectIncorrectIds = createSelector(selectQuizDomain, getState('incorrect', []));
export const selectCompleteIds = createSelector(selectQuizDomain, getState('complete', []));
export const selectQueueCount = createSelector(selectQueue, getState('length', 0));
export const selectCorrectCount = createSelector(selectCorrectIds, getState('length', 0));
export const selectIncorrectCount = createSelector(selectIncorrectIds, getState('length', 0));
export const selectCompleteCount = createSelector(selectCompleteIds, getState('length', 0));
export const selectSynonymModalOpen = createSelector(
  selectQuizDomain,
  getState('synonymModalOpen')
);
export const selectCurrentId = createSelector(selectCurrent, getState('id'));
export const selectCurrentStreakName = createSelector(
  selectCurrent,
  getBy('streak', getSrsRankName)
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
  [selectSessionCount, selectCompleteCount],
  (sessionCount, completeCount) => sessionCount - completeCount
);

export const selectCurrentPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId)
);

export const selectPercentComplete = createSelector(
  [selectCompleteCount, selectSessionRemainingCount],
  (complete, remaining) => calculatePercentage(complete, complete + remaining)
);

// FIXME: same as summary selector = extract transform function somewhere common?
export const selectPercentCorrect = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  (correct, incorrect) => {
    const total = correct + incorrect;
    const pristine = total < 1;
    return pristine ? 100 : calculatePercentage(correct, total);
  }
);

export const selectQueueNeeded = createSelector(
  [selectWrapUp, selectQueueCount, selectSessionRemainingCount],
  (wrapUp, queueCount, remaining) => {
    const needMoreWrapUp = wrapUp.active && queueCount < wrapUp.count;
    const needMoreMinimum = !wrapUp.active && queueCount < MINIMUM_QUEUE_COUNT;
    const moreQueueExists = queueCount < remaining;
    const queueNeeded = (needMoreWrapUp || needMoreMinimum) && moreQueueExists;
    return queueNeeded;
  }
);

export const selectIsFinalQuestion = createSelector(
  [selectQueue, selectCurrentId, selectWrapUp],
  (queue, currentId) => queue.length === 1 && currentId === queue[0]
);

export default selectQuizDomain;
