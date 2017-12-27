import { isEmpty } from "lodash";
import { stripOkurigana, isKanji } from "wanakana";

// FIXME: entires like { word: '申し申し', reading: 'もしもし' } end up with [['もしも', '申し申し']]
// with the もしも being centered over the first し - not wrong... but looks kinda weird.
// Can we do anything about it?

/**
 * Combines furigana with kanji into an array of string pairs.
 * @param  {String} word vocab kanji word
 * @param  {String} reading vocab kana reading
 * @param  {String} furi furigana placement info
 * @return {Array} furigana/kanji pairs
 * @example
 * combineFuri('お世辞', 'おせじ', '1:せ;2:じ')
 * // => [['', 'お'], ['せ', '世'], ['じ', '辞']]
 * combineFuri('大人しい', 'おとなしい') // fallback via basicFuri()
 * // => [['おとな', '大人'], ['', 'しい']]
 * combineFuri('使い方', 'つかいかた') // fallback via basicFuri()
 * // => [['つかいかた', '使い方']]
 *
 * // special reading fallback when chars are only kanji and furi is set to only 0:
 * combineFuri('胡座', 'あぐら', '0:あぐら')
 * // => [['あぐら', '胡座']]
 * // otherwise it displays weirdly with different furi/char font sizes
 * // or centered text when provided as [['あぐら', '胡'], ['', '座']]
 */
export function combineFuri(word = "", reading = "", furi = "") {
  if (!word) {
    return [];
  }
  const furiLocs = parseFuriString(furi);
  // 義訓/熟字訓 words with a single furi loc: 今日 "0:きょう"
  const isSpecialReading = furiLocs.length === 1 && word.split("").every(isKanji);
  if (isEmpty(reading) || isEmpty(furi) || isSpecialReading) {
    return basicFuri(word, reading);
  }
  return generatePairs(word, furiLocs);
}

/**
 * Displays simple furigana by separating main kanji and trailing okurigana
 * @param  {String} [word=''] '大人しい'
 * @param  {String} [reading=''] 'おとなしい'
 * @return {Array} [['おとな', '大人'], ['', 'しい']]
 */
export function basicFuri(word = "", reading = "") {
  if (!word) {
    return [];
  }
  if (word && isEmpty(reading)) {
    return [["", word]];
  }
  const mainLength =
    stripOkurigana(word).length - word.length || reading.length;
  const mainReading = [reading.slice(0, mainLength), stripOkurigana(word)];
  const okurigana = word.slice(mainLength);
  return okurigana ? [mainReading, ["", okurigana]] : [mainReading];
}

/**
 * Parses furigana placement string
 * @param  {String} [locations=''] '1:せ;2:じ'
 * @return {Array} [ [[1, 2], 'せ'], [[2, 3], 'じ'] ]
 */
export function parseFuriString(locations = "") {
  if (!locations) return [];
  return locations.split(";").map((entry) => {
    const [indexes, content] = entry.split(":");
    const [start, end] = indexes.split("-").map(Number);
    return [
      [start, end ? end + 1 : start + 1], // end index either doesn't exist, or is the *start* index of the final char
      content,
    ];
  });
}

/**
 * Generates array pairs consisting of furigana and kanji
 * @param  {String} word 'お世辞'
 * @param  {Array} furiLocs [[[1, 2], 'せ'], [[2, 3], 'じ']]
 * @return {Array} [['', 'お'], ['せ', '世'], ['じ', '辞']]
 */
export function generatePairs(word = "", furiLocs = []) {
  let prevCharEnd = 0;
  const pairs = [];
  furiLocs.forEach(([[start, end], furiText], index) => {
    // if no furigana at this index, add intervening chars
    if (start !== prevCharEnd) {
      pairs.push(["", word.slice(prevCharEnd, start)]);
    }

    // add furigana and associated chars
    pairs.push([furiText, word.slice(start, end)]);

    // if no more furigana left, add any remaining chars/okurigana with blank furi
    if (end < word.length && !furiLocs[index + 1]) {
      pairs.push(["", word.slice(end)]);
    }

    prevCharEnd = end;
  });

  return pairs;
}
