import flatMap from 'lodash/flatMap';
import toHiragana from 'wanakana/toHiragana';

/**
 * Removes meanings that are romaji versions of valid answers
 * If no meanings left, returns original meanings
 * @param  {Array} [meanings=[]] review meanings
 * @param  {Array} [readings=[]] review reading objects
 * @return {Array} filtered meanings
 * @example
 * filterRomajiReadings(['Southern Barbarians, Nanban'], [{ kana: ['なんばん'] }])
 * // => => ['Southern Barbarians']
 */
const filterRomajiReadings = (meanings = [], readings = []) => {
  const kanaReadings = flatMap(readings, ({ kana }) => kana);
  const filteredMeanings = meanings.filter(
    (meaning) => !kanaReadings.some((reading) => RegExp(reading, 'gi').test(toHiragana(meaning)))
  );
  return filteredMeanings.length ? filteredMeanings : meanings;
};

export default filterRomajiReadings;
