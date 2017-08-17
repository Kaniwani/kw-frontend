import { createSelector } from 'reselect';
import isFinite from 'lodash/isFinite';
import titleCase from 'voca/title_case';
import isBefore from 'date-fns/is_before';
import addMinutes from 'date-fns/add_minutes';

import groupByRank from 'utils/groupByRank';
import calculatePercentage from 'utils/calculatePercentage';
import getSrsRankName from 'utils/getSrsRankName';
import filterRomajiReadings from 'utils/filterRomajiReadings';

import { SESSION_EXPIRY_MINUTES } from 'shared/constants';

export const selectLocation = (state) => state.location;
export const selectGlobal = (state) => state.global;
export const selectEntities = (state) => state.global.entities;
export const selectIdFromMatch = (props) => +props.match.params.id;
export const selectCategoryFromMatch = (props) => props.match.params.category;

export const selectProfile = (state) => state.global.profile;
export const selectDashboard = (state) => state.global.dashboard;
export const selectSrsCounts = createSelector(selectDashboard, (dashboard) => dashboard.srsCounts);
export const selectNextReviewDate = createSelector(selectDashboard, (dashboard) => dashboard.nextReviewDate);

export const selectSettings = (state) => state.global.settings;
export const selectQuizSettings = createSelector(selectSettings, (settings) => settings.quiz);
export const selectVocabularySettings = createSelector(selectSettings, (settings) => settings.vocabulary);
export const selectOnVacation = createSelector(selectQuizSettings, (quiz) => quiz.onVacation);

export const selectLessonSession = (state) => state.global.session.lessons;
export const selectReviewSession = (state) => state.global.session.reviews;
export const selectReviewEntities = createSelector(selectEntities, (entities) => entities.reviews);
export const makeSelectReview = (id) => createSelector(selectReviewEntities, (reviews) => reviews && reviews[id]);

export const selectLevelEntities = createSelector(selectEntities, (entities) => entities.levels);
export const selectLevelIds = createSelector(selectLevelEntities, (levels) => Object.keys(levels));
export const makeSelectLevel = (id) => createSelector(selectLevelEntities, (levels) => levels && levels[id]);
export const makeSelectLevelReviews = (id) => createSelector(makeSelectLevel(id), (level) => level && level.reviews);

export const selectAnnouncements = (state) => state.global.announcements;
export const makeSelectAnnouncement = (id) => createSelector(selectAnnouncements, (announcements) => announcements && announcements[id]);

export const selectSessionCount = createSelector(
  (state, { category }) => [selectDashboard(state), category],
  ([dashboard, category]) => dashboard ? dashboard[`${category}Count`] : 0,
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

export const selectSessionByCategory = (state, { category }) => category === 'reviews' ? selectReviewSession(state) : selectLessonSession(state);

export const selectSessionLastActivity = createSelector(
  selectSessionByCategory,
  (session) => session.lastActivity,
);

export const selectSessionActive = createSelector(
  selectSessionLastActivity,
  (lastActivity) => lastActivity != null && isBefore(lastActivity, addMinutes(new Date(), SESSION_EXPIRY_MINUTES)),
);

export const selectQueue = createSelector(
  selectSessionByCategory,
  (session) => session.queue,
);

export const selectCurrentId = createSelector(
  selectSessionByCategory,
  ({ current }) => current,
);

export const selectCorrectCount = createSelector(
  selectSessionByCategory,
  ({ correct }) => correct.length
);

export const selectIncorrectCount = createSelector(
  selectSessionByCategory,
  ({ incorrect }) => incorrect.length
);

export const selectRemainingCount = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => Math.max(total - correct, 0),
);

export const selectCompleteCount = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  (correct, incorrect) => correct + incorrect,
);

export const selectPercentComplete = createSelector(
  [selectCorrectCount, selectSessionCount],
  (correct, total) => calculatePercentage(correct, total),
);

export const selectPercentCorrect = createSelector(
  [selectCorrectCount, selectCompleteCount],
  (correct, complete) => {
    const pristine = complete < 1;
    return pristine ? 100 : calculatePercentage(correct, complete);
  },
);

export const selectCorrectIds = createSelector(selectSessionByCategory, ({ correct }) => correct);
export const selectIncorrectIds = createSelector(selectSessionByCategory, ({ incorrect }) => incorrect);
export const selectCriticalIds = createSelector(
  [selectReviewEntities, selectCorrectIds, selectIncorrectIds],
  (reviews, correctIds, incorrectIds) => [...correctIds, ...incorrectIds].filter((id) => reviews[id].isCritical)
);

export const selectPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId),
);

const entityExists = (entities) => (id) => entities[id] != null;
const addStreakToId = (entities) => (id) => ({ id, streak: entities[id].streak });
export const makeSelectReviewsGroupedByRank = (ids) => createSelector(
  selectReviewEntities,
  (entities) => ids.every(entityExists(entities)) ? groupByRank(ids.map(addStreakToId(entities))) : {},
);
