import { groupBy } from 'lodash';

/**
 * Combines kana for each vocab word under a single entry
 * @param  {Array} [readings=[]] vocabulary readings
 * @return {Array} readings with kana combined
 */
export default function condenseReadings(readings = []) {
  // nest readings into groups by character entry
  const groupedReadings = Object.values(groupBy(readings, 'character'));
  // re-order entry with furistring to front
  const primaryFirst = groupedReadings.map((group) =>
    group.sort((entry) => (entry.furigana != null ? -1 : 1)));

  return combineKana(primaryFirst);
}

function combineKana(list) {
  return list.map((entries) =>
    entries
      .map(ensureKanaArray)
      .reduce((entry, next) => (!entry.kana ? next : spreadKana(entry, next)), {}));
}

function spreadKana(entry, next) {
  return {
    ...entry,
    kana: [...entry.kana, ...next.kana],
  };
}

function ensureKanaArray(obj) {
  return {
    ...obj,
    kana: Array.isArray(obj.kana) ? obj.kana : [obj.kana],
  };
}
