import groupBy from 'lodash/groupBy';

/**
 * Combines kana for a given character into a single entry
 * @param  {Array} [readings=[]] vocabulary readings
 * @return {Array} readings with kana combined
 */
export default function condenseReadings(readings = []) {
  const groupedReadings = Object.values(groupBy(readings, 'character'));
  return groupedReadings.map((entries) =>
    entries.reduce((entry, next) => {
      if (!entry.kana) {
        return nestKana(next);
      }
      entry.kana.push(next.kana);
      return entry;
    }, {}),
  );
}

/**
 * Removes kana from entry, and nests as a new entry in kana
 * @param  {Object} reading full vocab reading entry
 * @return {Object} vocab reading entry with kana added to nested kana
 */
function nestKana(reading) {
  const { kana, ...rest } = reading;
  return {
    ...rest,
    kana: [kana],
  };
}
