import isKanji from 'kanawana/isKanji';

export function splitKanji(word = '') {
  return word.split('').filter(isKanji);
}

const combineKanji = (result, { character }) => (result).concat(splitKanji(character));

export function getUniqueKanji(readings = []) {
  const kanji = readings.reduce(combineKanji, []);
  return Array.from(new Set(kanji));
}

export default getUniqueKanji;
