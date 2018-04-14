import { createSelector } from 'reselect';
import { sum, sortBy, pick, partialRight } from 'lodash';
import { addSeconds, isBefore } from 'date-fns';

import dateOrFalse from 'common/utils/dateOrFalse';
import formatSrsCounts from 'common/utils/formatSrsCounts';
import formatUpcomingReviews from 'common/utils/formatUpcomingReviews';

import { getState, getBy } from 'common/selectors';

const getHalfAMinuteAgo = () => addSeconds(new Date(), -30);

export const UI_DOMAIN = 'user';
export const ENTITY_DOMAIN = 'user';
export const selectUserUi = getState(UI_DOMAIN, {});
export const selectUserDomain = getState(['entities', ENTITY_DOMAIN], {});
export const selectUserLastLoad = createSelector(selectUserUi, getBy('lastLoad', dateOrFalse));
export const selectUserLoading = createSelector(selectUserUi, getBy('isLoading', Boolean));
export const selectUserShouldLoad = createSelector(
  [selectUserLastLoad, selectUserLoading, getHalfAMinuteAgo],
  (lastLoad, isLoading, halfAMinuteAgo) => !isLoading && isBefore(lastLoad, halfAMinuteAgo)
);

export const selectLessonsCount = getState(['quizCounts', 'lessonsCount'], NaN);
export const selectReviewsCount = getState(['quizCounts', 'reviewsCount'], NaN);

export const selectUserProfile = createSelector(selectUserDomain, getState('profile', {}));

export const selectUserSettings = createSelector(
  selectUserDomain,
  getBy(
    'profile',
    partialRight(pick, [
      'minimumWkSrsLevelToReview',
      'onVacation',
      'autoExpandAnswerOnSuccess',
      'autoExpandAnswerOnFailure',
      'infoDetailLevelOnSuccess',
      'infoDetailLevelOnFailure',
      'autoAdvanceOnSuccess',
      'autoAdvanceOnSuccessDelayMilliseconds',
      'followMe',
      'useEijiroProLink',
      'showKanjiSvgStrokeOrder',
      'showKanjiSvgGrid',
      'kanjiSvgDrawSpeed',
    ])
  )
);

export const selectUsername = createSelector(selectUserProfile, getBy('name'));
export const selectApiKey = createSelector(selectUserProfile, getBy('apiKey'));
export const selectUserLevel = createSelector(selectUserProfile, getBy('level', Number));
export const selectOnVacation = createSelector(selectUserProfile, getBy('onVacation', Boolean));

export const selectVacationDate = createSelector(
  selectUserProfile,
  getBy('vacationDate', dateOrFalse)
);

export const selectNextReviewDate = createSelector(
  selectUserProfile,
  // padded with 30 second safety net to ensure server is completely updated when we request new review count
  getBy('nextReviewDate', (date) => (date != null ? addSeconds(date, 30) : false))
);

export const selectFreshUser = createSelector(
  [
    selectNextReviewDate,
    selectLessonsCount,
    selectReviewsCount,
    getBy(['entities', 'reviews'], (x = {}) => Object.keys(x).length),
  ],
  (nextReviewDate, lessonsCount, reviewsCount, reviewEntitiesCount) =>
    !nextReviewDate && lessonsCount && !reviewsCount && !reviewEntitiesCount
);

export const selectLastWkSyncDate = createSelector(
  selectUserProfile,
  getBy('lastWanikaniSyncDate', dateOrFalse)
);

export const selectSrsCounts = createSelector(
  selectUserProfile,
  getBy('srsCounts', formatSrsCounts)
);

export const selectSrsCountsExist = createSelector(
  selectUserProfile,
  getBy('srsCounts', (counts = {}) => sum(Object.values(counts)) > 0)
);

export const selectLargestSliceIndex = createSelector(selectSrsCounts, (data) => {
  if (!data.length) {
    return 1;
  }
  const { value: largestValue } = sortBy(data, 'value')[data.length - 1];
  return data.findIndex(({ value }) => value === largestValue);
});

export const selectUpcomingReviews = createSelector(
  selectUserProfile,
  getBy('upcomingReviews', formatUpcomingReviews)
);

export const selectUpcomingReviewsTotal = createSelector(
  selectUserProfile,
  getBy('upcomingReviews', sum)
);

export const selectUseEijiroProLink = createSelector(
  selectUserProfile,
  getBy('useEijiroProLink', Boolean)
);

// NOTE: these only work for integers 1-10, my math-fu is not strong
/* eslint-disable no-mixed-operators */
const toKanjiStrokeStep = (value) => (10 - Number(value) + 1) / 100; // 1 => 0.1, 10 => 0.01
// const fromKanjiStrokeStep = (value) => Math.round(10 - (Number(value) * 100 - 1)); // 0.1 => 1, 0.01 => 10

export const selectKanjiStrokeSettings = createSelector(
  selectUserProfile,
  ({ showKanjiSvgGrid, showKanjiSvgStrokeOrder, kanjiSvgDrawSpeed }) => ({
    stroke: { order: { visible: showKanjiSvgStrokeOrder } },
    grid: { show: showKanjiSvgGrid },
    step: toKanjiStrokeStep(kanjiSvgDrawSpeed),
  })
);
