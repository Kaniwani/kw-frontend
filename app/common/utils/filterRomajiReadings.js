import { toHiragana } from 'wanakana';

const WHITELIST = ['tin can', 'kimono'];

/**
 * Removes meanings that are romaji versions of valid answers
 * If no meanings left, returns original meanings
 * @param  {Array} [meanings=[]] review meanings
 * @param  {Array} [readings=[]] review readings
 * @return {Array} filtered meanings
 * @example
 * filterRomajiReadings(['Southern Barbarians, Nanban'], ['なんばん'])
 * // => ['Southern Barbarians']
 */
const filterRomajiReadings = (meanings = [], readings = []) => {
  if (WHITELIST.some((word) => meanings.includes(word))) {
    return meanings;
  }

  // TODO: filter out meanings that are modified versions of long o
  // IE: jomon / joumon, tohoku / touhoku

  const filteredMeanings = meanings.filter(
    (meaning) => !readings.some((reading) => RegExp(`^${reading}`, 'i').test(toHiragana(meaning)))
  );
  return filteredMeanings.length ? filteredMeanings : meanings;
};

export default filterRomajiReadings;
