/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import getSrsRankName from 'utils/getSrsRankName';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';
import uniq from 'lodash/uniq';
import condenseReadings from 'utils/condenseReadings';
import { normalize, denormalize, schema } from 'normalizr';

// Add 'Common'|'Uncommon' and JLPT rank to tags list
const combineTags = ({ tags, jlpt, common }) => {
  const newTags = [common ? 'Common' : 'Uncommon', ...tags];
  return jlpt != null ? [jlpt, ...newTags] : newTags;
};

const dateOrNull = (date) => date == null ? null : new Date(date);

const toUniqueStringsArray = (data) => {
  let asArray = data;
  if (isString(data) && data.includes(', ')) {
    asArray = data.split(', ');
  } else {
    asArray = castArray(data);
  }
  return uniq(asArray);
};

const readingSchema = new schema.Entity('readings');
const synonymSchema = new schema.Entity('synonyms');
const vocabularySchema = new schema.Entity('vocabulary', {
  readings: [readingSchema],
});
const reviewSchema = new schema.Entity('reviews', {
  synonyms: [synonymSchema],
  vocabulary: vocabularySchema,
});

const levelSchema = new schema.Entity('levels', {
  reviews: [reviewSchema],
});

const levelReviewsSchema = [levelSchema];

export const normalizeLevels = (levels) =>
  normalize(levels, [levelSchema]);

export const denormalizeLevels = (levels, entities) =>
  denormalize(levels, [levelSchema], entities);

export const normalizeReviews = (reviews) =>
  normalize(reviews, [reviewSchema]);

export const denormalizeReviews = (reviews, entities) =>
  denormalize(reviews, [reviewSchema], entities);

export const normalizeReview = (review) =>
  normalize(review, reviewSchema);

export const denormalizeReview = (review, entities) =>
  denormalize(review, reviewSchema, entities);

export const normalizeLevelReviews = (id, reviews) =>
  normalize([{ id, reviews }], levelReviewsSchema);

export const denormalizeLevelReviews = (level, entities) =>
  normalize([level], levelReviewsSchema, entities);

export const serializeMeaning = (data) =>
  toUniqueStringsArray(data);

export const serializeLevels = (data) =>
  normalizeLevels(data.map(serializeLevel));

export const serializeLevelReviews = ({ id, response: { results } }) =>
  normalizeLevelReviews(+id, results.map(serializeReviewEntry));

export const serializeReadings = (data) =>
  condenseReadings(data).map(serializeReading);

export const serializeReviewEntries = ({ results }) =>
  normalizeReviews(results.map(serializeReviewEntry));

export const serializeStubbedReviewEntries = ({ results }) =>
  normalizeReviews(results.map(serializeStubbedReviewEntry));


export function serializeUser({
  email,
  profile,
}) {
  return {
    profile: serializeProfile({ email, ...profile }),
    dashboard: serializeDashboard(profile),
    settings: serializeSettings(profile),
  };
}

export function serializeProfile({
  email,
  name,
  api_key: apiKey,
  api_valid,
  level,
  join_date: joinDate,
  unlocked_levels: unlockedLevels,
} = {}) {
  return {
    name,
    email,
    apiKey,
    isApiValid: !!api_valid,
    currentLevel: +level,
    joinDate: dateOrNull(joinDate),
    unlockedLevels: unlockedLevels.map(Number),
  };
}

/* eslint-disable no-param-reassign, no-return-assign, no-sequences */
const ranksWithZeroCount = Object.values(SRS_RANKS).reduce((hash, key) => (hash[key] = 0, hash), {});
const upcaseKeys = (obj) =>
  Object.entries(obj).reduce((hash, [key, val]) => (hash[key.toUpperCase()] = +val, hash), {});
const coerceValsToNumber = (obj) =>
  Object.entries(obj).reduce((hash, [key, val]) => (hash[key] = parseInt(val, 10), hash), {});
/* eslint-enable */

export function serializeDashboard({
  reviews_count: reviewCount = 0,
  reviews_within_hour_count: nextHourReviews = 0,
  reviews_within_day_count: nextDayReviews = 0,
  last_wanikani_sync_date: lastWkSyncDate = null,
  srs_counts: srsCounts = ranksWithZeroCount,
} = {}) {
  return {
    reviewCount: +reviewCount,
    nextHourReviews: +nextHourReviews,
    nextDayReviews: +nextDayReviews,
    lastWkSyncDate: dateOrNull(lastWkSyncDate),
    srsCounts: coerceValsToNumber(upcaseKeys(srsCounts)),
  };
}

export function serializeSettings({
  follow_me: followMe,
  auto_advance_on_success: autoAdvanceCorrect,
  auto_expand_answer_on_success: autoExpandCorrect,
  auto_expand_answer_on_failure: autoExpandIncorrect,
  minimum_wk_srs_level_to_review: minimumSrsToReview,
  on_vacation: onVacation,
  vacation_date: vacationDate,
} = {}) {
  return {
    followMe,
    autoAdvanceCorrect,
    autoExpandCorrect,
    autoExpandIncorrect,
    minimumSrsToReview,
    onVacation,
    vacationDate: dateOrNull(vacationDate),
  };
}

export function serializeReading(reading) {
  return {
    id: +reading.id,
    level: reading.level,
    isCommon: !!reading.common,
    character: reading.character,
    kana: toUniqueStringsArray(reading.kana),
    tags: combineTags(reading),
    sentenceEn: reading.sentence_en || '',
    sentenceJa: reading.sentence_ja || '',
  };
}

export function serializeVocabularyEntry({
  id,
  meaning,
  readings,
} = {}) {
  return {
    id: +id,
    meanings: serializeMeaning(meaning),
    readings: serializeReadings(readings),
  };
}

export const serializeSynonym = ({ review: reviewId, ...rest }) => ({ reviewId, ...rest });
export const serializeSynonyms = (list) => list.length ? list.map(serializeSynonym) : [];

export function serializeStubbedReviewEntry({
  id,
  correct,
  incorrect,
  streak,
  notes,
  vocabulary,
  answer_synonyms,
} = {}) {
  return {
    id: +id,
    correct: +correct,
    incorrect: +incorrect,
    streak: +streak,
    streakName: getSrsRankName(+streak),
    notes: notes == null ? '' : notes,
    synonyms: serializeSynonyms(answer_synonyms),
    vocabulary: serializeVocabularyEntry(vocabulary),
  };
}

export function serializeReviewEntry({
  needs_review: isReviewReady,
  last_studied: lastReviewDate,
  unlock_date: unlockDate,
  next_review_date: nextReviewDate,
  hidden: isHidden,
  critical: isCritical,
  burned: isBurned,
  wanikani_burned,
  wanikani_srs_numeric,
  wanikani_srs,
  ...rest
} = {}) {
  return {
    isReviewReady,
    lastReviewDate: dateOrNull(lastReviewDate),
    unlockDate: dateOrNull(unlockDate),
    nextReviewDate: dateOrNull(nextReviewDate),
    isHidden,
    isCritical,
    isBurned,
    wk: {
      isBurned: !!wanikani_burned,
      streak: +wanikani_srs_numeric,
      streakName: wanikani_srs.toUpperCase(),
    },
    ...serializeStubbedReviewEntry(rest),
  };
}

function serializeLevel({
  level,
  vocabulary_count: count,
  unlocked,
}) {
  return {
    id: +level,
    count: +count,
    isLocked: !unlocked,
    isSubmitting: false, // FIXME: don't add to canonical data, store in UI state
  };
}
