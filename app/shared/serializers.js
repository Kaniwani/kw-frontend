/* eslint-disable camelcase */
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

function serializeUser({
  email,
  name,
  api_key,
  api_valid,
  join_date,
  level,
  unlocked_levels,
}) {
  return {
    name,
    email,
    currentLevel: +level,
    joinDate: setDate(join_date),
    apiKey: api_key,
    apiValid: api_valid,
    unlockedLevels: unlocked_levels.map(Number),
  };
}

function serializeDashboard({
  reviews_count,
  last_wanikani_sync_date,
  reviews_within_hour_count,
  reviews_within_day_count,
  srs_counts,
}) {
  return {
    reviewCount: +reviews_count,
    lastWkSyncDate: setDate(last_wanikani_sync_date),
    // FIXME: technically this model doesn't have a sync
    // should probably only set this after a succesful /sync/ request
    lastKwSyncDate: new Date(),
    nextHourReviews: +reviews_within_hour_count,
    nextDayReviews: +reviews_within_day_count,
    srsCounts: Object.values(srs_counts).map(Number),
  };
}

function serializeSettings({
  follow_me,
  auto_advance_on_success,
  auto_expand_answer_on_success,
  auto_expand_answer_on_failure,
  minimum_wk_srs_level_to_review,
  on_vacation,
  vacation_date,
}) {
  return {
    followMe: follow_me,
    autoAdvanceCorrect: auto_advance_on_success,
    autoExpandCorrect: auto_expand_answer_on_success,
    autoExpandIncorrect: auto_expand_answer_on_failure,
    reviewSrsLevelLimit: minimum_wk_srs_level_to_review,
    onVacation: on_vacation,
    vacationDate: setDate(vacation_date),
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
