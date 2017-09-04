import { groupBy } from 'lodash';

/**
 * Combines kana for a given character into a single entry
 * @param  {Array} [readings=[]] vocabulary readings
 * @return {Array} readings with kana combined
 */
export default function condenseReadings(readings = []) {
  const groupedReadings = Object.values(groupBy(readings, 'character'));
  return combineKana(groupedReadings);
}

function combineKana(list) {
  return list.map((entries) =>
    entries
      .map(ensureKanaArray)
      .reduce((entry, next) => !entry.kana ? next : spreadKana(entry, next), {}),
  );
}

function spreadKana(entry, next) {
  return {
    ...entry,
    kana: [
      ...entry.kana,
      ...next.kana,
    ],
  };
}

function ensureKanaArray(obj) {
  return {
    ...obj,
    kana: Array.isArray(obj.kana) ? obj.kana : [obj.kana],
  };
}
