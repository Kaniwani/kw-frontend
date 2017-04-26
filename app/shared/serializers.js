/* eslint-disable camelcase */
import { Map, List, Set } from 'immutable';
import * as models from 'shared/models';
import typeOf from 'utils/typeOf';

export function userSerializer() {
  // for use when querying users - admin only api
}

export function userProfileSerializer({
  email,
  profile,
  profile: {
    name,
    reviews_count,
    api_key,
    api_valid,
    join_date,
    last_wanikani_sync_date,
    level,
    unlocked_levels,
    reviews_within_hour_count,
    reviews_within_day_count,
    srs_counts: {
      apprentice,
      guru,
      master,
      enlightened,
      burned,
    },
  },
}) {
  return new models.ProfileRecord({
    name: `${name}`,
    email: `${email}`,
    reviewCount: reviews_count,
    currentLevel: `${level}`,
    joinDate: new Date(join_date),
    apiKey: api_key,
    apiValid: api_valid,
    lastWkSyncDate: new Date(last_wanikani_sync_date),
    // FIXME: technically this model doesn't have a sync
    // should probably only set this after a succesful /sync/ request
    lastKwSyncDate: new Date(),
    unlockedLevels: List(unlocked_levels),
    nextHourReviews: reviews_within_hour_count,
    nextDayReviews: reviews_within_day_count,
    srsCount: new models.SrsCountRecord({
      apprentice,
      guru,
      master,
      enlightened,
      burned,
    }),
    settings: settingsSerializer(profile),
  });
}

export function settingsSerializer({
  follow_me,
  auto_advance_on_success,
  auto_expand_answer_on_success,
  auto_expand_answer_on_failure,
  on_vacation,
  vacation_date,
  minimum_wk_srs_level_to_review,
}) {
  return new models.SettingsRecord({
    followMe: follow_me,
    autoAdvanceCorrect: auto_advance_on_success,
    autoExpandCorrect: auto_expand_answer_on_success,
    autoExpandIncorrect: auto_expand_answer_on_failure,
    reviewSrsLevelLimit: minimum_wk_srs_level_to_review,
    onVacation: on_vacation,
    vacationDate: new Date(vacation_date),
  });
}

export function synonymSerializer({ id, review, character, kana }) {
  return new models.SynonymRecord({
    id: `${id}`,
    review: `${review}`,
    character,
    kana,
  });
}

export function readingSerializer(reading) {
  return new models.ReadingRecord({
    id: `${reading.id}`,
    level: `${reading.level}`,
    character: reading.character,
    kana: reading.kana,
    tags: List(reading.tags),
    sentenceEn: reading.sentence_en,
    sentenceJa: reading.sentence_ja,
    jlpt: reading.jlpt,
    common: reading.common ? 'Common' : null,
  });
}

export function levelsSerializer(data) {
  return List(data.map(({ level, unlocked, vocabulary_count, count, ids }) =>
    new models.LevelRecord({
      level: `${level}`,
      unlocked: !!unlocked,
      count: vocabulary_count || count, // prefer server over local storage
      ids: List(ids),
    }),
  ));
}

// NOTE: vocab entries don't have synonyms
export function vocabularyEntrySerializer({ id, meaning, readings }) {
  return new models.VocabularyEntryRecord({
    id: `${id}`,
    meanings: meaningsSerializer(meaning),
    readings: readingsSerializer(readings),
  });
}

// NOTE: review vocab entries *do* have synonyms
export function reviewVocabEntrySerializer(data, answerSynonyms) {
  return new models.ReviewVocabEntryRecord({
    id: `${data.id}`,
    meanings: meaningsSerializer(data.meaning || data.meanings), // prefer server over local storage
    readings: readingsSerializer(data.readings),
    synonyms: synonymsSerializer(answerSynonyms || data.synonyms), // prefer server over local storage
  });
}

export function reviewEntrySerializer(data) {
  const {
    id,
    answer_synonyms,
    vocabulary,
    ...rest
  } = data;
  return new models.ReviewEntryRecord({
    id: `${id}`,
    ...rest,
    vocabulary: reviewVocabEntrySerializer(vocabulary, answer_synonyms),
    needsReview: rest.needs_review,
    lastReviewDate: new Date(rest.last_studied),
    unlockDate: new Date(rest.unlock_date),
    nextReviewDate: new Date(rest.next_review_date),
    isBurned: rest.burned,
    isHidden: rest.hidden,
    isCritical: rest.critical,
    wk: Map({
      streak: rest.wanikani_srs_numeric,
      streakName: rest.wanikani_srs,
      isBurned: rest.wanikani_burned,
    }),
  });
}

export function meaningsSerializer(data) {
  return data ? List(typeOf(data) === 'string' ? data.split(', ') : data) : List();
}

export function readingsSerializer(data) {
  return data ? List(data.map(readingSerializer)) : List();
}

export function synonymsSerializer(data) {
  return data ? List(data.map(synonymSerializer)) : List();
}

export function reviewVocabEntriesSerializer(data) {
  return data ? List(data.map(reviewVocabEntrySerializer)) : List();
}

export function vocabularyEntriesSerializer(data) {
  return data ? List(data.map(vocabularyEntrySerializer)) : List();
}

/**
 * Creates a dictionary of reviews keyed by their ids
 * As well as a unique set of those ids for reference
 * @param  {Object} data api response
 * @return {{reviews: Map, ids: Set}} serialized result
 */
export function reviewEntriesSerializer(data) {
  const idMap = Map(data.reduce((acc, item) => {
    acc[item.id] = reviewEntrySerializer(item); // eslint-disable-line no-param-reassign
    return acc;
  }, {}));
  return {
    reviews: idMap,
    ids: Set.fromKeys(idMap),
  };
}
