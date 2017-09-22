import { createSelectorCreator, defaultMemoize } from 'reselect';
import { isFinite, isEqual } from 'lodash';
import { titleCase } from 'voca';

import groupByRank from 'utils/groupByRank';
import dateOrFalse from 'utils/dateOrFalse';
import calculatePercentage from 'utils/calculatePercentage';
import getSrsRankName from 'utils/getSrsRankName';
import filterRomajiReadings from 'utils/filterRomajiReadings';

// create a "selector creator" that uses lodash.isEqual instead of ===
const createDeepEqualSelector = createSelectorCreator(
  defaultMemoize,
  isEqual,
);

export const selectLocation = (state) => state.route.location;
export const selectLocationPath = createDeepEqualSelector(selectLocation, (location) => location && location.pathname);
export const selectEntities = (state) => state.entities;
export const selectUi = (state) => state.ui;
export const selectIdFromMatch = (props) => +props.match.params.id;
export const selectCategoryFromMatch = (props) => props.match.params.category;

export const selectProfile = (state) => state.profile;
export const selectName = createDeepEqualSelector(selectProfile, (profile) => profile.name);
export const selectEmail = createDeepEqualSelector(selectProfile, (profile) => profile.email);
export const selectSrsCounts = createDeepEqualSelector(selectProfile, (profile) => profile.srsCounts);
export const selectUpcomingReviews = createDeepEqualSelector(selectProfile, (profile) => profile.upcomingReviews);
export const selectNextReviewDate = createDeepEqualSelector(selectProfile, (profile) => dateOrFalse(profile.nextReviewDate));
export const selectVacationDate = createDeepEqualSelector(selectProfile, (profile) => dateOrFalse(profile.vacationDate));
export const selectLastWkSyncDate = createDeepEqualSelector(selectProfile, (profile) => dateOrFalse(profile.lastWkSyncDate));

export const selectSettings = (state) => state.settings;
export const selectQuizSettings = createDeepEqualSelector(selectSettings, (settings) => settings.quiz);
export const selectVocabularySettings = createDeepEqualSelector(selectSettings, (settings) => settings.vocabulary);

export const selectReviewEntities = createDeepEqualSelector(selectEntities, (entities) => entities.reviews);
export const makeSelectReview = (id) => createDeepEqualSelector(selectReviewEntities, (reviews) => reviews && reviews[id]);

export const selectLevelEntities = createDeepEqualSelector(selectEntities, (entities) => entities.levels);
export const selectLevelIds = createDeepEqualSelector(selectLevelEntities, (levels) => Object.keys(levels));
export const makeSelectLevel = (id) => createDeepEqualSelector(selectLevelEntities, (levels) => levels && levels[id]);
export const makeSelectLevelReviews = (id) => createDeepEqualSelector(makeSelectLevel(id), (level) => level && level.reviews);

export const selectAnnouncements = (state) => state.announcements;
export const makeSelectAnnouncement = (id) => createDeepEqualSelector(selectAnnouncements, (announcements) => announcements && announcements[id]);

export const selectSessionCount = createDeepEqualSelector(
  (state, { category }) => [selectProfile(state), category],
  ([profile, category]) => profile ? profile[`${category}Count`] : 0,
);

export const selectUserLevel = createDeepEqualSelector(selectProfile, (state) => state && state.currentLevel);

export const isNotNumberedLevel = (id) => !isFinite(+id);
export const makeSelectLevelTitle = (id) => createDeepEqualSelector(() =>
  isNotNumberedLevel(id) ? titleCase(id) : id,
);

export const makeSelectLevelVocabCount = (id) => createDeepEqualSelector(
  makeSelectLevel(id),
  (level) => level && level.count
);

export const makeSelectLevelPrevLoaded = (id) => createDeepEqualSelector(
  makeSelectLevel(id),
  (level) => level && level.prevLoaded,
);

export const makeSelectLevelLocked = (id) => createDeepEqualSelector(
  makeSelectLevel(id),
  (level) => level && level.isLocked,
);

export const makeSelectReviewCorrect = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review && review.correct
);

export const makeSelectReviewIncorrect = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review && review.incorrect
);

export const makeSelectReviewMeanings = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? review.vocabulary.meanings : [],
);

export const makeSelectQuizMeanings = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? filterRomajiReadings(review.vocabulary.meanings, review.vocabulary.readings) : [],
);

export const makeSelectReviewReadings = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? review.vocabulary.readings : [],
);

export const makeSelectReviewSynonyms = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? review.synonyms : [],
);

export const makeSelectReviewNotes = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? review.notes : null,
);

export const makeSelectReviewStreak = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review && review.streak,
);

export const makeSelectReviewStreakName = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review && getSrsRankName(review.streak),
);

export const makeSelectReviewHidden = (id) => createDeepEqualSelector(
  makeSelectReview(id),
  (review) => review ? review.isHidden : null,
);

const generateToolTip = (correct, incorrect, meanings, readings) => {
  const correctnessText = () => {
    const total = correct + incorrect;
    const previouslyAnswered = total > 0;
    return `${previouslyAnswered ? `${calculatePercentage(correct, total)}%` : '<small>N/A</small>'}`;
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

export const makeSelectVocabChipToolTipMarkup = (id) => createDeepEqualSelector(
  [
    makeSelectReviewCorrect(id),
    makeSelectReviewIncorrect(id),
    makeSelectReviewMeanings(id),
    makeSelectReviewReadings(id),
  ],
  generateToolTip,
);

export const selectSession = (state) => state.session;
export const selectQueue = (state, { category }) => state.queue[category];
export const selectSummary = (state, { category }) => state.summary[category];

export const selectLastActivityDate = createDeepEqualSelector(
  selectSummary,
  (session) => dateOrFalse(session.lastActivityDate),
);

export const selectCurrent = createDeepEqualSelector(
  selectSession,
  ({ current }) => current,
);

export const selectCurrentId = createDeepEqualSelector(
  selectCurrent,
  (current) => current.id || false,
);

export const selectCurrentStreakName = createDeepEqualSelector(
  selectCurrent,
  (current) => getSrsRankName(current.streak),
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
  (correct, total) => Math.max(total - correct, 0),
);

export const selectPercentComplete = createDeepEqualSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => calculatePercentage(correct, total),
);

const calculateCorrectPercentage = (correct, incorrect) => {
  const complete = correct + incorrect;
  const pristine = complete < 1;
  return pristine ? 100 : calculatePercentage(correct, complete);
};

export const selectPercentCorrect = createDeepEqualSelector(
  [selectCorrectCount, selectIncorrectCount],
  calculateCorrectPercentage
);

export const selectSessionCorrectIds = createDeepEqualSelector(selectSession, ({ correct }) => correct);
export const selectSessionIncorrectIds = createDeepEqualSelector(selectSession, ({ incorrect }) => incorrect);
export const selectPreviouslyIncorrect = createDeepEqualSelector(
  [selectCurrentId, selectSessionIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId),
);

export const selectSummaryCorrectIds = createDeepEqualSelector(selectSummary, ({ correct }) => correct);
export const selectSummaryIncorrectIds = createDeepEqualSelector(selectSummary, ({ incorrect }) => incorrect);
export const selectSummaryCriticalIds = createDeepEqualSelector(
  [selectReviewEntities, selectSummaryCorrectIds, selectSummaryIncorrectIds],
  (reviews, correctIds, incorrectIds) => [...correctIds, ...incorrectIds].filter((id) => reviews[id].isCritical)
);
export const selectSummaryCorrectCount = createDeepEqualSelector(selectSummaryCorrectIds, (correct) => correct.length);
export const selectSummaryIncorrectCount = createDeepEqualSelector(selectSummaryIncorrectIds, (incorrect) => incorrect.length);

export const selectSummaryPercentCorrect = createDeepEqualSelector(
  [selectSummaryCorrectCount, selectSummaryIncorrectCount],
  calculateCorrectPercentage
);

const entityExists = (entities) => (id) => entities[id] != null;
const addStreakToId = (entities) => (id) => ({ id, streak: entities[id].streak });
export const makeSelectReviewsGroupedByRank = (ids) => createDeepEqualSelector(
  selectReviewEntities,
  (entities) => ids.every(entityExists(entities)) ? groupByRank(ids.map(addStreakToId(entities))) : {},
);
