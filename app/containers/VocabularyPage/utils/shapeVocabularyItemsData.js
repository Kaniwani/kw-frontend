/**
 * Modifies vocabulary levels data loaded from server to preferred js name formats and shape
 * @param  {object} data vocabulary items data server result
 * @return {object} Modified data
 */
export default function shapeVocabularyItemsData(data) {
  // const shapedItems = data.map((item) => {
  //   const shapedItem = {
  //     level: item.level,
  //     unlocked: item.unlocked,
  //     count: item.vocabulary_count,
  //   };
  //   return shapedItem;
  // });

  const { count, results: items } = data;
  return { count, items };
}
