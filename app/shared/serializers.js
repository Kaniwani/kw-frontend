/* eslint-disable camelcase */
import { SRS_RANKS } from 'shared/constants';
import typeOf from 'utils/typeOf';
import condenseReadings from 'utils/condenseReadings';

// Add 'Common'|'Uncommon' and JLPT rank to tags list
const combineTags = ({ tags, jlpt, common }) => {
  const newTags = [...tags, common ? 'Common' : 'Uncommon'];
  return jlpt != null ? newTags.concat(jlpt) : newTags;
};

const setDate = (date) => date == null ? null : new Date(date);

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
  email = '',
  name = '',
  api_key: apiKey = '',
  api_valid: apiValid = null,
  level: currentLevel = 0,
  join_date: joinDate = null,
  unlocked_levels: unlockedLevels = [],
} = {}) {
  return {
    name,
    email,
    apiKey,
    apiValid,
    currentLevel: +currentLevel,
    joinDate: setDate(joinDate),
    unlockedLevels: unlockedLevels.map(Number),
  };
}

export function serializeDashboard({
  reviews_count: reviewCount = 0,
  reviews_within_hour_count: nextHourReviews = 0,
  reviews_within_day_count: nextDayReviews = 0,
  last_wanikani_sync_date: lastWkSyncDate = null,
  srs_counts: srsCounts = Array.from({ length: Object.values(SRS_RANKS).length }, () => 0),
} = {}) {
  return {
    reviewCount: +reviewCount,
    nextHourReviews: +nextHourReviews,
    nextDayReviews: +nextDayReviews,
    lastWkSyncDate: setDate(lastWkSyncDate),
    srsCounts: srsCounts.map(Number),
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
    common: reading.common,
    character: reading.character,
    kana: reading.kana,
    tags: combineTags(reading),
    sentenceEn: reading.sentence_en,
    sentenceJa: reading.sentence_ja,
  };
}

export function serializeLevels(data) {
  return data.map(({ level, unlocked, vocabulary_count, count, ids }) => ({
    level: +level,
    unlocked: !!unlocked,
    count: +vocabulary_count || +count, // prefer server over local storage
    ids,
  }));
}


export function serializeVocabularyEntry({ synonyms, meaning, readings }) {
  return {
    synonyms,
    meanings: serializeMeaning(meaning),
    readings: serializeReadings(readings),
  };
}

export function serializeStubbedReviewEntry({
  id,
  correct,
  incorrect,
  streak,
  notes,
  answer_synonyms,
  vocabulary,
}) {
  return {
    id,
    correct,
    incorrect,
    streak,
    notes: notes == null ? '' : notes,
    vocabulary: serializeVocabularyEntry({ synonyms: answer_synonyms, ...vocabulary }),
  };
}

export function serializeReviewEntry({
  needs_review,
  last_studied,
  unlock_date,
  next_review_date,
  burned,
  hidden,
  critical,
  wanikani_srs_numeric,
  wanikani_srs,
  wanikani_burned,
  ...rest
}) {
  return {
    needsReview: needs_review,
    lastReviewDate: setDate(last_studied),
    unlockDate: setDate(unlock_date),
    nextReviewDate: setDate(next_review_date),
    isBurned: burned,
    isHidden: hidden,
    isCritical: critical,
    wkStreak: wanikani_srs_numeric,
    wkStreakName: wanikani_srs,
    wkBurned: wanikani_burned,
    ...serializeStubbedReviewEntry(rest),
  };
}

export function serializeMeaning(data) {
  return typeOf(data) === 'string' ? data.split(', ') : data;
}

export function serializeReadings(data) {
  return condenseReadings(data).map(serializeReading);
}

export function serializeReviewEntries(data) {
  return data.map(serializeReviewEntry);
}

export function serializeStubbedReviewEntries(data) {
  return data.map(serializeStubbedReviewEntry);
}

export function serializeVocabularyEntries(data) {
  return data.map(serializeVocabularyEntry);
}
