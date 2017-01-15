import { Map, List, Set } from 'immutable';
import * as models from 'shared/models';

export function userProfileSerializer({
  id,
  email,
  last_login,
  date_joined,
  is_active,
  profile,
  profile: {
    name,
    api_key,
    api_valid,
    last_wanikani_sync_date,
    level,
    unlocked_levels,
  },
}) {
  return new models.UserProfileRecord({
    id,
    name,
    email,
    level,
    lastLogin: new Date(last_login),
    joinDate: new Date(date_joined),
    isActive: is_active,
    apiKey: api_key,
    apiValid: api_valid,
    lastWkSyncDate: new Date(last_wanikani_sync_date),
    // FIXME: technically this isn't a sync, we should probably only set this after a succesful /sync/ request?
    lastKwSyncDate: new Date(),
    unlockedLevels: unlocked_levels,
    settings: settingsSerializer(profile),
  });
}

export function settingsSerializer({
  follow_me,
  auto_advance_on_success,
  auto_expand_answer_on_success,
  auto_expand_answer_on_failure,
  only_review_burned,
  on_vacation,
  vacation_date,
}) {
  return new models.SettingsRecord({
    followMe: follow_me,
    autoAdvanceCorrect: auto_advance_on_success,
    autoExpandCorrect: auto_expand_answer_on_success,
    autoExpandIncorrect: auto_expand_answer_on_failure,
    burnedOnly: only_review_burned,
    onVacation: on_vacation,
    vacationDate: new Date(vacation_date),
  });
}

export function vocabularyLevelSerializer(data) {
  return data.map(({ level, unlocked, vocabulary_count }) =>
    new models.VocabLevelRecord({
      level,
      isLocked: !unlocked,
      count: vocabulary_count,
    }),
  );
}

export function stubbedReviewEntrySerializer(data) {
  const {
    answer_synonyms,
    vocabulary: {
      id,
      meaning,
      readings,
    },
    ...props
  } = data;
  return new models.StubbedReviewEntryRecord({
    ...props,
    vocabulary: new models.VocabEntryRecord({
      id,
      meanings: new List(meaning.split(', ')),
      readings: new List(readings.map((reading) => new models.ReadingRecord({
        ...reading,
        tags: new List(reading.tags),
        sentenceEn: reading.sentence_en,
        sentenceJa: reading.sentence_ja,
        common: reading.common ? 'Common' : null,
      }))),
      synonyms: new List(answer_synonyms.map((synonym) => new models.SynonymRecord({
        ...synonym,
        tags: new List(synonym.tags),
        sentenceEn: synonym.sentence_en,
        sentenceJa: synonym.sentence_ja,
        common: synonym.common ? 'Common' : null,
      }))),
    }),
  });
}


export function reviewEntrySerializer(data) {
  const {
    answer_synonyms,
    vocabulary: {
      id,
      meaning,
      readings,
    },
    ...props
  } = data;
  return new models.ReviewEntryRecord({
    ...props,
    vocabulary: new models.VocabEntryRecord({
      id,
      meanings: new List(meaning.split(', ')),
      readings: new List(readings.map((reading) => new models.ReadingRecord({
        ...reading,
        tags: new List(reading.tags),
        sentenceEn: reading.sentence_en,
        sentenceJa: reading.sentence_ja,
        common: reading.common ? 'Common' : null,
      }))),
      synonyms: new List(answer_synonyms.map((synonym) => new models.SynonymRecord({
        ...synonym,
        tags: new List(synonym.tags),
        sentenceEn: synonym.sentence_en,
        sentenceJa: synonym.sentence_ja,
        common: synonym.common ? 'Common' : null,
      }))),
    }),
    needsReview: props.needs_review,
    lastReviewDate: new Date(props.last_studied),
    unlockDate: new Date(props.unlock_date),
    nextReviewDate: new Date(props.next_review_date),
    isBurned: props.burned,
    isHidden: props.hidden,
    isCritical: props.critical,
    wk: new Map({
      streak: props.wanikani_srs_numeric,
      streakName: props.wanikani_srs,
      isBurned: props.wanikani_burned,
    }),
  });
}

/**
 * Creates a dictionary of reviews keyed by their ids
 * As well as a unique set of those ids for reference
 * @param  {object} data
 * @return {{reviews: Map, ids: Set}} serialized result
 */
export function reviewEntriesSerializer(data) {
  const idMap = new Map(data.reduce((acc, item) => {
    acc[item.id] = reviewEntrySerializer(item); // eslint-disable-line no-param-reassign
    return acc;
  }, {}));
  return {
    reviews: idMap,
    ids: Set.fromKeys(idMap),
  };
}

/**
 * NOTE: this is currently unused & we should create a model/record instead
 * NOTE: likely have to update this once Jisho api is more stable
 */
export function jishoEntrySerializer(data) {
  const shapedData = data.map((item) => {
    const shapedItem = {
      common: item.common,
      notes: item.tags,
      readings: item.japanese.map((obj) => ({
        characters: obj.word,
        kana: obj.reading,
      })),
      meaning: item.senses[0].english_definitions.join(', '),
      tags: item.senses[0].parts_of_speech,
      senses: item.senses[0],
      sentences: item.senses.reduce((list, obj) => obj.sentences ? list.concat(obj.sentences) : list, []),
    };
    return shapedItem;
  });

  return shapedData;
}
