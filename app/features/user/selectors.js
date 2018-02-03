import { createSelector } from 'reselect';
import { addMinutes, isBefore, parse } from 'date-fns';
import { sum, pick, partialRight } from 'lodash';
import dateOrFalse from 'common/utils/dateOrFalse';
import formatSrsCounts from 'common/utils/formatSrsCounts';
import formatUpcomingReviews from 'common/utils/formatUpcomingReviews';

import {
  getState,
  getVal,
  makeSelectDomain,
  makeSelectDomainShouldLoad,
  makeSelectDomainLastLoad,
  makeSelectEntityDomain,
} from 'common/selectors';

export const UI_DOMAIN = 'user';
export const ENTITY_DOMAIN = 'user';
export const selectUserUi = makeSelectDomain(UI_DOMAIN);
export const selectUserDomain = makeSelectEntityDomain(ENTITY_DOMAIN);

export const selectUserProfile = createSelector(selectUserDomain, getState('profile', {}));

export const selectUserSettings = createSelector(
  selectUserDomain,
  getVal(
    'profile',
    partialRight(pick, [
      'minimumWkSrsLevelToReview',
      'onVacation',
      'autoExpandAnswerOnSuccess',
      'autoExpandAnswerOnFailure',
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

const shouldLoad = ({ isLoading, lastLoad }) => {
  if (isLoading) {
    return false;
  }
  const fiveMinsAgo = addMinutes(new Date(), -1);
  return !lastLoad || isBefore(parse(lastLoad), fiveMinsAgo);
};

export const selectUserShouldLoad = makeSelectDomainShouldLoad(UI_DOMAIN, shouldLoad);
export const selectUserLastLoad = makeSelectDomainLastLoad(UI_DOMAIN);

export const selectUserName = createSelector(selectUserProfile, getVal('name'));

export const selectReviewsCount = createSelector(selectUserProfile, getVal('reviewsCount', Number));

export const selectLessonsCount = createSelector(selectUserProfile, getVal('lessonsCount', Number));

export const selectUserLevel = createSelector(selectUserProfile, getVal('level', Number));

export const selectOnVacation = createSelector(selectUserProfile, getVal('onVacation', Boolean));

export const selectVacationDate = createSelector(
  selectUserProfile,
  getVal('vacationDate', dateOrFalse)
);

export const selectNextReviewDate = createSelector(
  selectUserProfile,
  getVal('nextReviewDate', dateOrFalse)
);

export const selectLastWkSyncDate = createSelector(
  selectUserProfile,
  getVal('lastWanikaniSyncDate', dateOrFalse)
);

export const selectApiValid = createSelector(selectUserProfile, getVal('apiValid', Boolean));

export const selectSrsCounts = createSelector(
  selectUserProfile,
  getVal('srsCounts', formatSrsCounts)
);

export const selectSrsCountsExist = createSelector(
  selectUserProfile,
  getVal('srsCounts', (counts) => sum(Object.values(counts)) > 0)
);

export const selectUpcomingReviews = createSelector(
  selectUserProfile,
  getVal('upcomingReviews', formatUpcomingReviews)
);

export const selectUseEijiroProLink = createSelector(
  selectUserProfile,
  getVal('useEijiroProLink', Boolean)
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

export const selectQuizSettings = createSelector(selectUserProfile, (profile) =>
  pick(profile, [
    'autoAdvanceOnSuccess',
    'autoAdvanceOnSuccessDelayMilliseconds',
    'autoExpandAnswerOnSuccess',
    'autoExpandAnswerOnFailure',
  ])
);
