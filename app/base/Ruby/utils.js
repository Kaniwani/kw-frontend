import { isEmpty } from 'lodash';
import stripOkurigana from 'wanakana/stripOkurigana';

/**
 * Combines furigana with characters into an array of string pairs.
 * Accepts either a furiString from jmdict_furigana or a pre-parsed array of furi locations
 * @param  {String} character vocab kanji word
 * @param  {String} reading vocab kana reading
 * @param  {String|Array} furi furigana placement info
 * @return {Array} furigana/character pairs
 * @example
 * combineFuri('お世辞', 'おせじ', '1:せ;2:じ')
 * // => [['', 'お'], ['せ', '世'], ['じ', '辞']]
 * combineFuri('お世辞', 'おせじ', [[[1, 2], 'せ'], [[2, 3], 'じ']])
 * // => [['', 'お'], ['せ', '世'], ['じ', '辞']]
 * combineFuri('大人しい', 'おとなしい', null) // fallback via basicFuri()
 * // => [['おとな', '大人'], ['', 'しい']]
 * combineFuri('使い方', 'つかいかた', null) // fallback via basicFuri()
 * // => [['つかいかた', '使い方']]
 */
export function combineFuri(character = '', reading = '', furi = '') {
  if (!isEmpty(furi)) {
    const furiLocs = Array.isArray(furi) ? furi : parseFuriString(furi);
    return generatePairs(character, furiLocs);
  }
  return basicFuri(character, reading);
}

/**
 * Displays simple furigana by separating main chars and trailing okurigana
 * @param  {String} [character=''] '大人しい'
 * @param  {String} [reading=''] 'おとなしい'
 * @return {Array} [['おとな', '大人'], ['', 'しい']]
 */
export function basicFuri(character = '', reading = '') {
  const mainLength = (stripOkurigana(character).length - character.length) || reading.length;
  const mainReading = [reading.slice(0, mainLength), stripOkurigana(character)];
  const okurigana = character.slice(mainLength);
  return okurigana ? [mainReading, ['', okurigana]] : [mainReading];
}

/**
 * Parses furigana placement string
 * @param  {String} [locations=''] '1:せ;2:じ'
 * @return {Array} [ [[1, 2], 'せ'], [[2, 3], 'じ'] ]
 */
export function parseFuriString(locations = '') {
  if (!locations) return [];
  return locations.split(';')
    .map((entry) => {
      const [indexes, content] = entry.split(':');
      const [start, end] = indexes.split('-').map(Number);
      return [
        [start, end ? end + 1 : start + 1], // end index either doesn't exist, or is the *start* index of the final char
        content,
      ];
    });
}

/**
 * Generates array pairs consisting of furigana and characters
 * @param  {String} character 'お世辞'
 * @param  {Array} furiLocs [[[1, 2], 'せ'], [[2, 3], 'じ']]
 * @return {Array} [['', 'お'], ['せ', '世'], ['じ', '辞']]
 */
export function generatePairs(character = '', furiLocs = []) {
  let prevCharEnd = 0;
  const pairs = [];
  furiLocs.forEach(([[start, end], furiText], index) => {
    // if no furigana at this index, add intervening chars
    if (start !== prevCharEnd) {
      pairs.push(['', character.slice(prevCharEnd, start)]);
    }

    // add furigana and associated chars
    pairs.push([furiText, character.slice(start, end)]);

    // if no more furigana left, add any remaining chars/okurigana with blank furi
    if (end < character.length && !furiLocs[index + 1]) {
      pairs.push(['', character.slice(end)]);
    }

    prevCharEnd = end;
  });

  return pairs;
}
