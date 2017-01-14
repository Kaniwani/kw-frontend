import { VocabEntry, VocabRecord, VocabReading } from 'shared/models';

/**
 * Modifies vocabulary item data loaded from server to preferred js name formats and shape
 * @param  {object} data vocabulary item data server result
 * @return {object} Modified data
 */
export default function shapeVocabularyItemData({ vocabulary: { id, meaning, readings }, answer_synonyms, ...props }) {
  return new VocabEntry({
    ...props,
    vocabulary: new VocabRecord({
      id,
      meanings: meaning.split(', '),
      readings: readings.map((reading) => new VocabReading({
        ...reading,
        sentenceEn: reading.sentence_en,
        sentenceJa: reading.sentence_ja,
        tags: reading.tags,
        common: reading.common ? 'Common' : null,
      })),
      synonyms: answer_synonyms,
    }),
    needsReview: props.needs_review,
    lastReviewDate: new Date(props.last_studied),
    unlockDate: new Date(props.unlock_date),
    nextReviewDate: new Date(props.next_review_date),
    isBurned: props.burned,
    isHidden: props.hidden,
    isCritical: props.critical,
    wk: {
      streak: props.wanikani_srs_numeric,
      streakName: props.wanikani_srs,
      isBurned: props.wanikani_burned,
    },
  });
}
