import uniq from 'lodash/uniq';
import { isKanji } from 'wanakana';

export function splitKanji(word = '') {
  return word.split('').filter(isKanji);
}

const combineKanji = (newList, { character }) => newList.concat(splitKanji(character));

export function getUniqueKanji(readings = []) {
  return uniq(readings.reduce(combineKanji, []));
}

export default getUniqueKanji;
