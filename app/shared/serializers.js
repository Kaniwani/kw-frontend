/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import getSrsRankName from 'utils/getSrsRankName';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';
import uniq from 'lodash/uniq';
import condenseReadings from 'utils/condenseReadings';

import { normalizeReviews, normalizeLevelReviews, normalizeLevels } from 'shared/schemas';

// Add 'Common'|'Uncommon' and JLPT rank to tags list
const combineTags = ({ tags, jlpt, common }) => {
  const newTags = [common ? 'Common' : 'Uncommon', ...tags];
  return jlpt != null ? [jlpt, ...newTags] : newTags;
};

const setDate = (date) => date == null ? null : new Date(date);

const toUniqueStringsArray = (data) => {
  let asArray = data;
  if (isString(data) && data.includes(', ')) {
    asArray = data.split(', ');
  } else {
    asArray = castArray(data);
  }
  return uniq(asArray);
};

export function serializeUserProfile({
  email,
  profile,
}) {
  return {
    user: serializeUser({ email, ...profile }),
    dashboard: serializeDashboard(profile),
    settings: serializeSettings(profile),
  };
}

export function serializeUser({
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
    joinDate: setDate(joinDate),
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
    lastWkSyncDate: setDate(lastWkSyncDate),
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
    vacationDate: setDate(vacationDate),
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
    lastReviewDate: setDate(lastReviewDate),
    unlockDate: setDate(unlockDate),
    nextReviewDate: setDate(nextReviewDate),
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
    isSubmitting: false,
  };
}

export function serializeMeaning(data) {
  return toUniqueStringsArray(data);
}

export function serializeLevels(data) {
  return normalizeLevels(data.map(serializeLevel));
}

export function serializeLevelReviews({ id, response: { results } }) {
  return normalizeLevelReviews(+id, results.map(serializeReviewEntry));
}

export function serializeReadings(data) {
  return condenseReadings(data).map(serializeReading);
}

export function serializeReviewEntries({ results }) {
  return normalizeReviews(results.map(serializeReviewEntry));
}

export function serializeStubbedReviewEntries({ results }) {
  return normalizeReviews(results.map(serializeStubbedReviewEntry));
}
