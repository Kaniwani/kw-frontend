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
        return {
          ...next,
        };
      }
      return spreadKana(entry, next);
    }, {}),
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
