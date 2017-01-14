import { schema } from 'normalizr';
import uuid from 'uuid';

export const readingSchema = new schema.Entity('readings', {}, { idAttribute: 'uuid' });

export const vocabularySchema = new schema.Entity('vocabularies', { readings: [readingSchema] }, {
  idAttribute: 'uuid',
});

export const entrySchema = new schema.Entity('entries', { vocabulary: vocabularySchema }, {
  processStrategy: ({
    id,
    vocabulary: {
      meaning,
      readings,
    },
    answer_synonyms,
    correct,
    incorrect,
    streak,
    notes,
    needs_review,
    burned,
    hidden,
    critical,
    wanikani_srs_numeric,
    wanikani_srs,
    wanikani_burned,
    last_studied,
    unlock_date,
    next_review_date,
  }) => ({
    id,
    vocabulary: {
      uuid: uuid(),
      meanings: meaning.split(', '),
      readings: readings.map((reading) => ({
        ...reading,
        uuid: uuid(),
        common: reading.common ? 'Common' : '',
      })),
      synonyms: answer_synonyms,
    },
    correct,
    incorrect,
    streak,
    notes,
    needsReview: needs_review,
    lastReviewDate: new Date(last_studied),
    unlockDate: new Date(unlock_date),
    nextReviewDate: new Date(next_review_date),
    isBurned: burned,
    isHidden: hidden,
    isCritical: critical,
    wanikani: {
      streak: wanikani_srs_numeric,
      streakName: wanikani_srs,
      isBurned: wanikani_burned,
    },
  }),
});

export const entryListSchema = [entrySchema];

export const levelSchema = new schema.Entity('levels', {}, {
  idAttribute: 'level',
  processStrategy: ({ level, unlocked, vocabulary_count }) => ({
    level,
    isLocked: !unlocked,
    count: vocabulary_count,
  }),
});

export const levelListSchema = [levelSchema];
