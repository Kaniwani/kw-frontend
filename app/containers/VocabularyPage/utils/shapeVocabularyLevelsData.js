import { VocabLevel } from 'shared/models';

/**
 * Modifies vocabulary levels data loaded from server to preferred js name formats and shape
 * @param  {object} data Vocabulary Levels data server result
 * @return {object} Modified data
 */
export default function shapeVocabularyLevelsData(data) {
  return data.map(({ level, unlocked, vocabulary_count }) =>
    new VocabLevel({
      level,
      isLocked: !unlocked,
      count: vocabulary_count,
    }),
  );
}
