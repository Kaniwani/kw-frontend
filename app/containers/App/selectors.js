import { createSelector } from 'reselect';
import isFinite from 'lodash/isFinite';
import titleCase from 'voca/title_case';
import isBefore from 'date-fns/is_before';
import addMinutes from 'date-fns/add_minutes';

import { SESSION_EXPIRY_MINUTES } from 'shared/constants';
import groupByRank from 'utils/groupByRank';
import dateOrFalse from 'utils/dateOrFalse';
import calculatePercentage from 'utils/calculatePercentage';
import getSrsRankName from 'utils/getSrsRankName';
import filterRomajiReadings from 'utils/filterRomajiReadings';

export const selectLocation = (state) => state.route.location;
export const selectLocationPath = createSelector(selectLocation, (location) => location && location.pathname);
export const selectEntities = (state) => state.entities;
export const selectUi = (state) => state.ui;
export const selectIdFromMatch = (props) => +props.match.params.id;
export const selectCategoryFromMatch = (props) => props.match.params.category;

export const selectProfile = (state) => state.profile;
export const selectName = createSelector(selectProfile, (profile) => profile.name);
export const selectEmail = createSelector(selectProfile, (profile) => profile.email);
export const selectSrsCounts = createSelector(selectProfile, (profile) => profile.srsCounts);
export const selectNextReviewDate = createSelector(selectProfile, (profile) => dateOrFalse(profile.nextReviewDate));
export const selectVacationDate = createSelector(selectProfile, (profile) => dateOrFalse(profile.vacationDate));
export const selectLastWkSyncDate = createSelector(selectProfile, (profile) => dateOrFalse(profile.lastWkSyncDate));

export const selectSettings = (state) => state.settings;
export const selectQuizSettings = createSelector(selectSettings, (settings) => settings.quiz);
export const selectVocabularySettings = createSelector(selectSettings, (settings) => settings.vocabulary);

export const selectReviewEntities = createSelector(selectEntities, (entities) => entities.reviews);
export const makeSelectReview = (id) => createSelector(selectReviewEntities, (reviews) => reviews && reviews[id]);

export const selectLevelEntities = createSelector(selectEntities, (entities) => entities.levels);
export const selectLevelIds = createSelector(selectLevelEntities, (levels) => Object.keys(levels));
export const makeSelectLevel = (id) => createSelector(selectLevelEntities, (levels) => levels && levels[id]);
export const makeSelectLevelReviews = (id) => createSelector(makeSelectLevel(id), (level) => level && level.reviews);

export const selectAnnouncements = (state) => state.announcements;
export const makeSelectAnnouncement = (id) => createSelector(selectAnnouncements, (announcements) => announcements && announcements[id]);

export const selectSessionCount = createSelector(
  (state, { category }) => [selectProfile(state), category],
  ([profile, category]) => profile ? profile[`${category}Count`] : 0,
);

export const selectUserLevel = createSelector(selectProfile, (state) => state && state.currentLevel);

export const isNotNumberedLevel = (id) => !isFinite(+id);
export const makeSelectLevelTitle = (id) => createSelector(() =>
  isNotNumberedLevel(id) ? titleCase(id) : id,
);

export const makeSelectLevelVocabCount = (id) => createSelector(
  makeSelectLevel(id),
  (level) => level && level.count
);

export const makeSelectLevelPrevLoaded = (id) => createSelector(
  makeSelectLevel(id),
  (level) => level && level.prevLoaded,
);

export const makeSelectLevelLocked = (id) => createSelector(
  makeSelectLevel(id),
  (level) => level && level.isLocked,
);

export const makeSelectReviewCorrect = (id) => createSelector(
  makeSelectReview(id),
  (review) => review && review.correct
);

export const makeSelectReviewIncorrect = (id) => createSelector(
  makeSelectReview(id),
  (review) => review && review.incorrect
);

export const makeSelectReviewMeanings = (id) => createSelector(
  makeSelectReview(id),
  (review) => review ? review.vocabulary.meanings : [],
);

export const makeSelectQuizMeanings = (id) => createSelector(
  makeSelectReview(id),
  (review) => review ? filterRomajiReadings(review.vocabulary.meanings, review.vocabulary.readings) : [],
);

export const makeSelectReviewReadings = (id) => createSelector(
  makeSelectReview(id),
  (review) => review ? review.vocabulary.readings : [],
);

export const makeSelectReviewSynonyms = (id) => createSelector(
  makeSelectReview(id),
  (review) => review ? review.synonyms : [],
);

export const makeSelectReviewNotes = (id) => createSelector(
  makeSelectReview(id),
  (review) => review ? review.notes : null,
);

export const makeSelectReviewStreak = (id) => createSelector(
  makeSelectReview(id),
  (review) => review && review.streak,
);

export const makeSelectReviewStreakName = (id) => createSelector(
  makeSelectReview(id),
  (review) => review && getSrsRankName(review.streak),
);

export const makeSelectReviewHidden = (id) => createSelector(
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

export const makeSelectVocabChipToolTipMarkup = (id) => createSelector(
  [
    makeSelectReviewCorrect(id),
    makeSelectReviewIncorrect(id),
    makeSelectReviewMeanings(id),
    makeSelectReviewReadings(id),
  ],
  generateToolTip,
);

export const selectQueue = (state, { category }) => state.queue[category];
export const selectSession = (state, { category }) => state.session[category];
export const selectSummary = (state, { category }) => state.summary[category];

export const selectLastActivityDate = createSelector(
  selectSummary,
  (session) => dateOrFalse(session.lastActivityDate),
);

export const selectSessionActive = createSelector(
  [selectLastActivityDate, selectQueue],
  (lastActivityDate, queue) => {
    const expiryDate = addMinutes(lastActivityDate, SESSION_EXPIRY_MINUTES);
    const isActive = lastActivityDate && queue.length > 0 && isBefore(new Date(), expiryDate);
    return isActive;
  }
);

export const selectCurrent = createSelector(
  selectSession,
  ({ current }) => current,
);

export const selectCurrentId = createSelector(
  selectCurrent,
  (current) => current.id,
);

export const selectCurrentStreakName = createSelector(
  selectCurrent,
  (current) => getSrsRankName(current.streak),
);

export const selectCorrectCount = createSelector(
  selectSession,
  ({ correct }) => correct.length
);

export const selectIncorrectCount = createSelector(
  selectSession,
  ({ incorrect }) => incorrect.length
);

export const selectRemainingCount = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => Math.max(total - correct, 0),
);

export const selectPercentComplete = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => calculatePercentage(correct, total),
);

const calculateCorrectPercentage = (correct, incorrect) => {
  const complete = correct + incorrect;
  const pristine = complete < 1;
  return pristine ? 100 : calculatePercentage(correct, complete);
};

export const selectPercentCorrect = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  calculateCorrectPercentage
);

export const selectCorrectIds = createSelector(selectSession, ({ correct }) => correct);
export const selectIncorrectIds = createSelector(selectSession, ({ incorrect }) => incorrect);
export const selectPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId),
);

export const selectSummaryCorrectIds = createSelector(selectSummary, ({ correct }) => correct);
export const selectSummaryIncorrectIds = createSelector(selectSummary, ({ incorrect }) => incorrect);
export const selectSummaryCriticalIds = createSelector(
  [selectReviewEntities, selectSummaryCorrectIds, selectSummaryIncorrectIds],
  (reviews, correctIds, incorrectIds) => [...correctIds, ...incorrectIds].filter((id) => reviews[id].isCritical)
);
export const selectSummaryCorrectCount = createSelector(selectSummaryCorrectIds, (correct) => correct.length);
export const selectSummaryIncorrectCount = createSelector(selectSummaryIncorrectIds, (incorrect) => incorrect.length);

export const selectSummaryPercentCorrect = createSelector(
  [selectSummaryCorrectCount, selectSummaryIncorrectCount],
  calculateCorrectPercentage
);

const entityExists = (entities) => (id) => entities[id] != null;
const addStreakToId = (entities) => (id) => ({ id, streak: entities[id].streak });
export const makeSelectReviewsGroupedByRank = (ids) => createSelector(
  selectReviewEntities,
  (entities) => ids.every(entityExists(entities)) ? groupByRank(ids.map(addStreakToId(entities))) : {},
);
