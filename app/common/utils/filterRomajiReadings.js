import { toHiragana } from 'wanakana';

/**
 * Removes meanings that are romaji versions of valid answers
 * If no meanings left, returns original meanings
 * @param  {Array} [meanings=[]] review meanings
 * @param  {Array} [readings=[]] review readings
 * @return {Array} filtered meanings
 * @example
 * filterRomajiReadings(['Southern Barbarians, Nanban'], ['なんばん'])
 * // => => ['Southern Barbarians']
 */
const filterRomajiReadings = (meanings = [], readings = []) => {
  const filteredMeanings = meanings.filter(
    (meaning) => !readings.some((reading) => RegExp(`^${reading}$`, 'i').test(toHiragana(meaning)))
  );
  return filteredMeanings.length ? filteredMeanings : meanings;
};

export default filterRomajiReadings;
