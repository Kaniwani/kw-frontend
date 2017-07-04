/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import isString from 'lodash/isString';
import castArray from 'lodash/castArray';
import uniq from 'lodash/uniq';
import condenseReadings from 'utils/condenseReadings';

import { normalizeReviews, normalizeLevel } from 'shared/schemas';

// Add 'Common'|'Uncommon' and JLPT rank to tags list
const combineTags = ({ tags, jlpt, common }) => {
  const newTags = [...tags, common ? 'Common' : 'Uncommon'];
  return jlpt != null ? newTags.concat(jlpt) : newTags;
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
  api_valid: apiValid,
  level,
  join_date: joinDate,
  unlocked_levels: unlockedLevels = [],
} = {}) {
  return {
    name,
    email,
    apiKey,
    apiValid,
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
  follow_me: followMe = true,
  auto_advance_on_success: autoAdvanceCorrect = false,
  auto_expand_answer_on_success: autoExpandCorrect = true,
  auto_expand_answer_on_failure: autoExpandIncorrect = true,
  minimum_wk_srs_level_to_review: reviewSrsLevelLimit = SRS_RANKS.ONE,
  on_vacation: onVacation = false,
  vacation_date: vacationDate = null,
} = {}) {
  return {
    followMe,
    autoAdvanceCorrect,
    autoExpandCorrect,
    autoExpandIncorrect,
    reviewSrsLevelLimit,
    onVacation,
    vacationDate: setDate(vacationDate),
  };
}

export function serializeReading(reading) {
  return {
    id: reading.id,
    level: reading.level,
    common: !!reading.common,
    character: reading.character,
    kana: toUniqueStringsArray(reading.kana),
    tags: combineTags(reading),
    sentenceEn: reading.sentence_en,
    sentenceJa: reading.sentence_ja,
  };
}

export function serializeVocabularyEntry({
  id,
  meaning = [],
  readings = [],
} = {}) {
  return {
    id,
    meanings: serializeMeaning(meaning),
    readings: serializeReadings(readings),
  };
}

export function serializeStubbedReviewEntry({
  id,
  correct = 0,
  incorrect = 0,
  streak = 0,
  notes = null,
  answer_synonyms: synonyms = [],
  vocabulary = {},
} = {}) {
  return {
    id,
    correct,
    incorrect,
    streak: +streak,
    notes,
    synonyms,
    vocabulary: serializeVocabularyEntry(vocabulary),
  };
}

export function serializeReviewEntry({
  needs_review: needsReview,
  last_studied: lastReviewDate,
  unlock_date: unlockDate,
  next_review_date: nextReviewDate,
  burned: isBurned,
  hidden: isHidden,
  critical: isCritical,
  wanikani_srs_numeric: wkStreak,
  wanikani_srs: wkStreakName,
  wanikani_burned: wkBurned,
  ...rest
} = {}) {
  return {
    needsReview,
    lastReviewDate: setDate(lastReviewDate),
    unlockDate: setDate(unlockDate),
    nextReviewDate: setDate(nextReviewDate),
    isBurned,
    isHidden,
    isCritical,
    wkStreak,
    wkStreakName,
    wkBurned,
    ...serializeStubbedReviewEntry(rest),
  };
}

export function serializeMeaning(data) {
  return toUniqueStringsArray(data);
}

export function serializeLevels(data) {
  return data.reduce((hash, item) => Object.assign({},
    hash,
    {
      [item.level]: {
        level: +item.level,
        count: +item.vocabulary_count,
        unlocked: !!item.unlocked,
        submitting: false,
      },
    }), {});
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

export function serializeLevel({ level, results }) {
  return normalizeLevel(level, results.map(serializeReviewEntry));
}
