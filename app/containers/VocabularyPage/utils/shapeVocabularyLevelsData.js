/**
 * Modifies vocabulary levels data loaded from server to preferred js name formats and shape
 * @param  {object} data Vocabulary Levels data server result
 * @return {object} Modified data
 */
export default function shapeVocabularyLevelsData(data) {
  const shapedLevels = data.map((item) => {
    const shapedItem = {
      level: item.level,
      unlocked: item.unlocked,
      count: item.vocabulary_count,
    };
    return shapedItem;
  });

  return shapedLevels;
}
