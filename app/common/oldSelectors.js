import { createSelectorCreator, defaultMemoize } from "reselect";
import { isFinite, isEqual } from "lodash";
import { titleCase } from "voca";

import { SRS_RANKS } from 'common/constants';

import groupByRank from 'common/utils/groupByRank';
import dateOrFalse from 'common/utils/dateOrFalse';
import getSrsRankName from 'common/utils/getSrsRankName';
import filterRomajiReadings from 'common/utils/filterRomajiReadings';
import formatSrsCounts from 'common/utils/formatSrsCounts';
import formatUpcomingReviews from 'common/utils/formatUpcomingReviews';

// create a "selector creator" that uses lodash.isEqual instead of a shallow ===
export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual);

export const selectIdFromMatch = (props) => +props.match.params.id;
export const selectCategoryFromMatch = (props) => props.match.params.category;
export const selectEntities = (state) => state.entities;
export const selectUi = (state) => state.ui;

export const selectUser = (state) => state.user;
export const selectProfile = createDeepEqualSelector(selectUser, (user) => {
  if (!user || !user.profile) {
    return {};
  }
  const { profile } = user;
  return {
    id: profile.id,
    name: profile.name,
    apiKey: profile.apiKey,
    apiValid: !!profile.apiValid,
    joinDate: dateOrFalse(profile.joinDate),
    level: +profile.level,
    unlockedLevels: profile.unlockedLevels.map(Number),
    reviewsCount: +profile.reviewsCount,
    lessonsCount: +profile.lessonsCount,
    nextHourReviews: +profile.nextHourReviews,
    nextDayReviews: +profile.nextDayReviews,
    nextReviewDate: dateOrFalse(profile.nextReviewDate),
    vacationDate: dateOrFalse(profile.vacationDate),
    lastWkSyncDate: dateOrFalse(profile.lastWkSyncDate),
    srsCounts: formatSrsCounts(profile.srsCounts),
    upcomingReviews: formatUpcomingReviews(profile.upcomingReviews),
    autoAdvanceCorrect: profile.autoAdvanceCorrect || false,
    autoAdvanceSpeed: profile.autoAdvanceSpeed || 2000,
    autoExpandCorrect: profile.autoExpandCorrect || true,
    autoExpandIncorrect: profile.autoExpandIncorrect || true,
    minimumSrsToReview: profile.minimumSrsToReview || SRS_RANKS.ONE,
    useEijiroPro: profile.useEijiroPro || false,
    kanjiSvgStepSpeed: profile.kanjiSvgStepSpeed || 0.01,
    kanjiSvgShowStrokes: profile.kanjiSvgShowStrokes || false,
    kanjiSvgShowGrid: profile.kanjiSvgShowGrid || true,
  };
});

// OLD

export const selectName = createDeepEqualSelector(selectProfile, (profile) => profile.name);
export const selectEmail = createDeepEqualSelector(selectProfile, (profile) => profile.email);
export const selectSrsCounts = createDeepEqualSelector(
  selectProfile,
  (profile) => profile.srsCounts
);
export const selectUpcomingReviews = createDeepEqualSelector(
  selectProfile,
  (profile) => profile.upcomingReviews
);
export const selectNextReviewDate = createDeepEqualSelector(selectProfile, (profile) =>
  dateOrFalse(profile.nextReviewDate)
);
export const selectVacationDate = createDeepEqualSelector(selectProfile, (profile) =>
  dateOrFalse(profile.vacationDate)
);
export const selectLastWkSyncDate = createDeepEqualSelector(selectProfile, (profile) =>
  dateOrFalse(profile.lastWkSyncDate)
);

export const selectSettings = (state) => state.settings;
export const selectQuizSettings = createDeepEqualSelector(
  selectSettings,
  (settings) => settings.quiz
);
export const selectVocabularySettings = createDeepEqualSelector(
  selectSettings,
  (settings) => settings.vocabulary
);

export const selectReviewEntities = createDeepEqualSelector(
  selectEntities,
  (entities) => entities.reviews
);

export const selectReview = (state, id) =>
  createDeepEqualSelector(selectReviewEntities, (reviews = {}) => reviews[id] || {})(state, id);

export const makeSelectReview = (id) =>
  createDeepEqualSelector(selectReviewEntities, (reviews) => (reviews && reviews[id]) || {});

export const selectLevels = createDeepEqualSelector(selectEntities, (entities) => entities.levels);

export const selectLevelIds = createDeepEqualSelector(selectLevels, (levels) =>
  Object.keys(levels)
);
export const makeSelectLevel = (id) =>
  createDeepEqualSelector(selectLevels, (levels) => levels && levels[id]);
export const makeSelectLevelReviews = (id) =>
  createDeepEqualSelector(makeSelectLevel(id), (level) => level && level.reviews);

export const makeSelectLevelReviewEntities = (id) =>
  createDeepEqualSelector(
    [makeSelectLevelReviews(id), selectReviewEntities],
    (ids, reviews) => ids && ids.map((id) => reviews[id])
  );

export const selectSearchIds = (state) => state.searchResults;

export const selectAnnouncements = (state) => state.announcements;
export const makeSelectAnnouncement = (id) =>
  createDeepEqualSelector(
    selectAnnouncements,
    (announcements) => announcements && announcements[id]
  );

export const selectSessionCount = createDeepEqualSelector(
  (state, { category }) => [selectProfile(state), category],
  ([profile, category]) => (profile ? profile[`${category}Count`] : 0)
);

export const selectUserLevel = createDeepEqualSelector(
  selectProfile,
  (state) => state && state.level
);
export const selectUnlockedLevels = createDeepEqualSelector(
  selectProfile,
  (state) => state && state.unlockedLevels
);

export const isNotNumberedLevel = (id) => !isFinite(+id);
export const makeSelectLevelTitle = (id) =>
  createDeepEqualSelector(() => (isNotNumberedLevel(id) ? titleCase(id) : id));

export const makeSelectLevelVocabCount = (id) =>
  createDeepEqualSelector(makeSelectLevel(id), (level) => level && level.count);

export const makeSelectLevelLocked = (id) =>
  createDeepEqualSelector(makeSelectLevel(id), (level) => level && level.isLocked);

export const makeSelectReviewCorrect = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => review && review.correct);

export const makeSelectReviewIncorrect = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => review && review.incorrect);

export const makeSelectReviewMeanings = (id) =>
  createDeepEqualSelector(
    makeSelectReview(id),
    (review) =>
      review
        ? review.vocabulary.meanings.concat(
          (review.meaningSynonyms || []).map(({ text }) => text)
        )
        : []
  );

export const makeSelectQuizMeanings = (id) =>
  createDeepEqualSelector(
    makeSelectReview(id),
    (review) =>
      review ? filterRomajiReadings(review.vocabulary.meanings, review.vocabulary.readings) : []
  );

export const makeSelectReviewReadings = (id) =>
  createDeepEqualSelector(
    makeSelectReview(id),
    (review) => (review ? review.vocabulary.readings : [])
  );

export const makeSelectReviewSynonyms = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => (review ? review.synonyms : []));

export const makeSelectReviewNotes = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => (review ? review.notes : null));

export const makeSelectReviewStreak = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => review && review.streak);

export const makeSelectReviewStreakName = (id) =>
  createDeepEqualSelector(
    makeSelectReview(id),
    (review) => review && getSrsRankName(review.streak)
  );

export const makeSelectReviewHidden = (id) =>
  createDeepEqualSelector(makeSelectReview(id), (review) => (review ? review.isHidden : null));

const generateToolTip = (correct, incorrect, meanings, readings) => {
  const correctnessText = () => {
    const total = correct + incorrect;
    const previouslyAnswered = total > 0;
    return `${
      previouslyAnswered
        ? `${calculatePercentage(correct, total)}%`
        : "<small>N/A</small>"
    }`;
  };
  return `
  <ul>
    <li>
      <span>JA </span>
      <span lang="ja">${readings[0].kana[0]}</span>
    </li>
    <li>
      <span>EN</span>
      <span>${titleCase(meanings[0])}</span>
    </li>
    <li>
      <span>RC</span>
      <span>${correctnessText(correct, incorrect)}</span>
    </li>
  </ul>
  `;
};

export const makeSelectVocabChipToolTipMarkup = (id) =>
  createDeepEqualSelector(
    [
      makeSelectReviewCorrect(id),
      makeSelectReviewIncorrect(id),
      makeSelectReviewMeanings(id),
      makeSelectReviewReadings(id),
    ],
    generateToolTip
  );

export const selectSession = (state) => state.session;
export const selectQueue = (state, { category }) => state.queue[category];
export const selectSummary = (state, { category }) => state.summary[category];

export const selectLastActivityDate = createDeepEqualSelector(selectSummary, (session) =>
  dateOrFalse(session.lastActivityDate)
);

export const selectCurrent = createDeepEqualSelector(selectSession, ({ current }) => current);

export const selectCurrentId = createDeepEqualSelector(
  selectCurrent,
  (current) => current.id || false
);

export const selectCurrentStreakName = createDeepEqualSelector(selectCurrent, (current) =>
  getSrsRankName(current.streak)
);

export const selectCorrectCount = createDeepEqualSelector(
  selectSession,
  ({ correct }) => correct.length
);

export const selectIncorrectCount = createDeepEqualSelector(
  selectSession,
  ({ incorrect }) => incorrect.length
);

export const selectRemainingCount = createDeepEqualSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => Math.max(total - correct, 0)
);

export const selectQueueNeeded = createDeepEqualSelector(
  [selectQueue, selectRemainingCount],
  (queue, remaining) => {
    const isQueueNeeded = queue.length < 10 && remaining > queue.length + 1;
    console.log({
      queueLength: queue.length,
      queueLengthPlusOne: queue.length + 1,
      remaining,
      isQueueNeeded,
    });
    return isQueueNeeded;
  }
);

export const selectSummaryCorrectIds = createDeepEqualSelector(
  selectSummary,
  ({ correct }) => correct
);
export const selectSummaryIncorrectIds = createDeepEqualSelector(
  selectSummary,
  ({ incorrect }) => incorrect
);
export const selectSummaryCriticalIds = createDeepEqualSelector(
  [selectReviewEntities, selectSummaryCorrectIds, selectSummaryIncorrectIds],
  (reviews, correctIds, incorrectIds) =>
    [...correctIds, ...incorrectIds].filter((id) => reviews[id].isCritical)
);
export const selectSummaryCorrectCount = createDeepEqualSelector(
  selectSummaryCorrectIds,
  (correct) => correct.length
);
export const selectSummaryIncorrectCount = createDeepEqualSelector(
  selectSummaryIncorrectIds,
  (incorrect) => incorrect.length
);

export const selectSummaryPercentCorrect = createDeepEqualSelector(
  [selectSummaryCorrectCount, selectSummaryIncorrectCount],
  calculateCorrectPercentage
);

const entityExists = (entities) => (id) => entities[id] != null;
const addStreakToId = (entities) => (id) => ({ id, streak: entities[id].streak });
export const makeSelectReviewsGroupedByRank = (ids) =>
  createDeepEqualSelector(
    selectReviewEntities,
    (entities) =>
      ids.every(entityExists(entities)) ? groupByRank(ids.map(addStreakToId(entities))) : {}
  );
