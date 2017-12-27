import {
  WEBLIO_QUERY_URL,
  PATTERN_NAMES,
  KATA_DIGRAPHS,
  HIRA_DIGRAPHS,
} from './constants';

export const makeWeblioLink = (keyword = '') => `${WEBLIO_QUERY_URL}${keyword}`;

export const isDigraph = (kana = '') => KATA_DIGRAPHS.includes(kana) || HIRA_DIGRAPHS.includes(kana);

export function getMoraCount(reading = []) {
  if (Array.isArray(reading)) {
    return reading.length;
  }
  return typeof reading === 'string' ? getMorae(reading).length : 0;
}

export function getMorae(reading = '') {
  return reading.split('')
    .reduce((arr, char) =>
      isDigraph(char) ?
        arr.slice(0, -1).concat(arr.slice(-1) + char) :
        arr.concat(char),
    []);
}

// Pitch pattern lengths are moraCount + 1, the final index indicates particle pitch
export function makePitchPattern(moraCount = 0, pitchNum = -1) {
  switch (getPitchPatternName(moraCount, pitchNum)) {
    case (PATTERN_NAMES.HEIBAN.EN): return makeHeiban(moraCount);
    case (PATTERN_NAMES.ATAMADAKA.EN): return makeAtamadaka(moraCount);
    case (PATTERN_NAMES.ODAKA.EN): return makeOdaka(moraCount);
    case (PATTERN_NAMES.NAKADAKA.EN): return makeNakadaka(moraCount, pitchNum);
    default: return [];
  }
}

export function getPitchPatternName(moraCount = 0, pitchNum = -1, locale = 'EN') {
  let names = { EN: 'unknown', JA: '不詳' };
  if (pitchNum === 0) { names = PATTERN_NAMES.HEIBAN; }
  if (pitchNum === 1) { names = PATTERN_NAMES.ATAMADAKA; }
  if (pitchNum > 1 && pitchNum < moraCount) { names = PATTERN_NAMES.NAKADAKA; }
  if (pitchNum > 1 && pitchNum === moraCount) { names = PATTERN_NAMES.ODAKA; }
  return names[locale] || 'unknown';
}

// initial low -> rest high, particle high
// [0, 1, 1, 1, 1, 1]
export function makeHeiban(moraCount = 0) {
  if (moraCount < 1) return [];
  return [
    0,
    ...Array(moraCount).fill(1).slice(0, -1),
    1,
  ];
}

// initial high -> rest low, particle low
// [1, 0, 0, 0, 0, 0]
export function makeAtamadaka(moraCount = 0) {
  if (moraCount < 1) return [];
  return [
    1,
    ...Array(moraCount).fill(0).slice(0, -1),
    0,
  ];
}

// initial low, rest high, particle low
// [0, 1, 1, 1, 1, 0]
export function makeOdaka(moraCount = 0) {
  if (moraCount < 2) return [];
  return [
    0,
    ...Array(moraCount).fill(1).slice(0, -1),
    0,
  ];
}

// initial low, one or more high, rest (at least 1) low, particle low
// final mora before particle *must* be low
// [0, 1, 0, 0, 0, 0]
// [0, 1, 1, 0, 0, 0]
// [0, 1, 1, 1, 0, 0]
export function makeNakadaka(moraCount = 0, pitchNum = 0) {
  if ((moraCount < 3 || pitchNum < 2 || pitchNum >= moraCount)) return [];
  return [
    0,
    ...Array(pitchNum - 1).fill(1),
    ...Array(moraCount - pitchNum).fill(0),
    0,
  ];
}
