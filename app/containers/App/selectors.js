import { createSelector } from 'reselect';
import isNumber from 'lodash/isNumber';
import titleCase from 'voca/title_case';
import groupByRank from 'utils/groupByRank';
import calculatePercentage from 'utils/calculatePercentage';
import getSrsRankName from 'utils/getSrsRankName';

export const selectLocation = (state) => state.location;
export const selectGlobal = (state) => state.global;
export const selectIdFromMatch = (props) => +props.match.params.id;
export const selectCategoryFromMatch = (props) => props.match.params.category;

export const selectUi = createSelector(selectGlobal, (state) => state.ui);
export const selectUser = createSelector(selectGlobal, (state) => state.user);

export const selectProfile = createSelector(selectUser, (state) => state.profile);
export const selectDashboard = createSelector(selectUser, (state) => state.dashboard);
export const selectSrsCounts = createSelector(selectDashboard, (state) => state.srsCounts);

export const selectSettings = createSelector(selectGlobal, (state) => state.settings);
export const selectQuizSettings = createSelector(selectSettings, (state) => state.quiz);
export const selectVocabularySettings = createSelector(selectSettings, (state) => state.vocabulary);
// FIXME: put expandedCards in summarysection && vocablevel reducer so they can be independent
export const selectVocabExpanded = createSelector(selectSettings, (state) => state.vocabulary.expandedCards);

export const selectLessons = createSelector(selectGlobal, (state) => state.lessons);
export const selectLessonEntities = createSelector(selectLessons, (state) => state.entities);
export const makeSelectLesson = (id) => createSelector(selectLessonEntities, (state) => state && state[id]);

export const selectReviews = createSelector(selectGlobal, (state) => state.reviews);
export const selectReviewEntities = createSelector(selectReviews, (state) => state.entities);
export const makeSelectReview = (id) => createSelector(selectReviewEntities, (state) => state && state[id]);

export const selectLevels = createSelector(selectGlobal, (state) => state.levels);
export const selectLevelEntities = createSelector(selectLevels, (state) => state.entities);
export const selectLevelIds = createSelector(selectLevels, (state) => Object.keys(state.entities));
export const makeSelectLevel = (id) => createSelector(selectLevelEntities, (state) => state && state[id]);
export const makeSelectLevelReviews = (id) => createSelector(makeSelectLevel(id), (state) => state && state.reviews);

export const selectSessionCount = createSelector(
  (state, { category }) => [selectDashboard(state), category],
  ([dashboard, category]) => dashboard ? dashboard[`${category}Count`] : 0,
);

export const selectUserLevel = createSelector(selectProfile, (state) => state && state.currentLevel);

const isWithinUserWKLevel = (id, userLevel) => isNumber(id) && id <= userLevel;
const isNotNumberedLevel = (id) => !isNumber(id);

export const makeSelectLevelTitle = (id) => createSelector(() =>
  isNotNumberedLevel(id) ? titleCase(id) : id,
);
export const makeSelectLevelCount = (id) => createSelector(
  makeSelectLevel(id),
  (level) => level && level.count
);
export const makeSelectLevelSubmitting = (id) => createSelector(
  selectUi,
  (ui) => ui.levels.submitting.includes(id)
);
export const makeSelectLevelActionable = (id) => createSelector(
  [selectUserLevel, makeSelectLevelSubmitting(id)],
  (userLevel, isSubmitting) => !isSubmitting && (isWithinUserWKLevel(id, userLevel) || isNotNumberedLevel(id)),
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
  [makeSelectReviewCorrect(id), makeSelectReviewIncorrect(id), makeSelectReviewMeanings(id), makeSelectReviewReadings(id)],
  generateToolTip,
);

const selectSessionByCategory = (state, { category }) =>
  category === 'reviews' ?
    selectReviews(state) :
    selectLessons(state);

export const selectSession = createSelector(selectSessionByCategory, (state) => state);

export const selectQueue = createSelector(
  selectSession,
  (session) => session.queue,
);

export const selectCurrentId = createSelector(
  selectSession,
  ({ current }) => current,
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
  (correct, total) => Math.max((total - 1) /* 1 = current review */ - correct, 0),
);

export const selectCompleteCount = createSelector(
  [selectCorrectCount, selectIncorrectCount],
  (correct, incorrect) => correct + incorrect,
);

export const selectSessionActive = createSelector(
  selectCompleteCount,
  (complete) => complete >= 1,
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

export const selectCorrectIds = createSelector(selectSession, ({ correct }) => correct);
export const selectIncorrectIds = createSelector(selectSession, ({ incorrect }) => incorrect);
export const selectCriticalIds = createSelector(
  [selectReviewEntities, selectCorrectIds, selectIncorrectIds],
  (reviews, correctIds, incorrectIds) => [...correctIds, ...incorrectIds].filter((id) => reviews[id].isCritical)
);

export const selectPreviouslyIncorrect = createSelector(
  [selectCurrentId, selectIncorrectIds],
  (currentId, incorrectIds) => incorrectIds.includes(currentId),
);

export const makeSelectReviewsGroupedByRank = (ids) => createSelector(
  selectReviewEntities,
  (entities) => ids.every((id) => entities[id] != null) ?
    groupByRank(ids.map((id) => ({ id, streak: entities[id].streak }))) :
    {},
);
