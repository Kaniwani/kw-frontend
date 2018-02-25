import { createSelector } from 'reselect';
import { addMinutes, isBefore, parse } from 'date-fns';
import { sum, pick, partialRight } from 'lodash';
import dateOrFalse from 'common/utils/dateOrFalse';
import formatSrsCounts from 'common/utils/formatSrsCounts';
import devLog from 'common/utils/devLog';
import formatUpcomingReviews from 'common/utils/formatUpcomingReviews';

import { getState, getBy } from 'common/selectors';

export const UI_DOMAIN = 'user';
export const ENTITY_DOMAIN = 'user';
export const selectUserUi = getState(UI_DOMAIN);
export const selectUserDomain = getState(['entities', ENTITY_DOMAIN]);

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

export const selectUserShouldLoad = createSelector(
  [selectUserUi, (state) => state.quizSession],
  ({ isLoading, lastLoad }, quizSession) => {
    const fiveMinsAgo = addMinutes(new Date(), -5);
    const allow = !lastLoad || isBefore(parse(lastLoad), fiveMinsAgo);
    const reject = isLoading || quizSession.active;
    if (reject) {
      devLog('rejecting load user');
      return false;
    }
    if (allow) {
      devLog('allowing load user');
      return true;
    }
    devLog('rejecting load user by default');
    return false;
  }
);

export const selectUserLastLoad = createSelector(selectUserUi, getBy('lastLoad', dateOrFalse));
export const selectUsername = createSelector(selectUserProfile, getBy('name'));
export const selectApiKey = createSelector(selectUserProfile, getBy('apiKey'));
export const selectReviewsCount = createSelector(selectUserProfile, getBy('reviewsCount', Number));
export const selectLessonsCount = createSelector(selectUserProfile, getBy('lessonsCount', Number));
export const selectUserLevel = createSelector(selectUserProfile, getBy('level', Number));
export const selectOnVacation = createSelector(selectUserProfile, getBy('onVacation', Boolean));

export const selectVacationDate = createSelector(
  selectUserProfile,
  getBy('vacationDate', dateOrFalse)
);

export const selectNextReviewDate = createSelector(
  selectUserProfile,
  getBy('nextReviewDate', dateOrFalse)
);

export const selectLastWkSyncDate = createSelector(
  selectUserProfile,
  getBy('lastWanikaniSyncDate', dateOrFalse)
);

export const selectApiValid = createSelector(selectUserProfile, getBy('apiValid', Boolean));

export const selectSrsCounts = createSelector(
  selectUserProfile,
  getBy('srsCounts', formatSrsCounts)
);

export const selectSrsCountsExist = createSelector(
  selectUserProfile,
  getBy('srsCounts', (counts) => sum(Object.values(counts)) > 0)
);

export const selectUpcomingReviews = createSelector(
  selectUserProfile,
  getBy('upcomingReviews', formatUpcomingReviews)
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

export const selectQuizSettings = createSelector(selectUserProfile, (profile) =>
  pick(profile, [
    'autoAdvanceOnSuccess',
    'autoAdvanceOnSuccessDelayMilliseconds',
    'autoExpandAnswerOnSuccess',
    'autoExpandAnswerOnFailure',
  ])
);
