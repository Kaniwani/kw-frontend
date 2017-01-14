import shapeVocabularyItemData from './shapeVocabularyItemData';
/**
 * Modifies vocabulary levels data loaded from server to preferred js name formats and shape
 * @param  {object} data vocabulary items data server result
 * @return {object} Modified data
 */
export default function shapeVocabularyItemsData(data) {
  return data.results.map(shapeVocabularyItemData);
}
