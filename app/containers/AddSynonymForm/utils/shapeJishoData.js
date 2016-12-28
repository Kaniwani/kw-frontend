/**
 * Modifies response data loaded from jisho to preferred js name formats and shape
 * @param  {object} response Jisho api response
 * @return {object} Modified jisho data
 */
export default function shapeJishoData(response) {
  const shapedData = response.data.map((item) => {
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
