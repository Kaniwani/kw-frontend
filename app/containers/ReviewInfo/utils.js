import {
  MAX_DETAIL_DEPTH,
  DETAIL_LEVELS,
} from './constants';

import {
  TILDE_JA,
  TILDE_EN,
} from 'containers/ReviewAnswer/constants';

import { stripOkurigana } from 'kanawana';

/**
 * Converts detail level number to a name
 * @param  {Number} level
 * @return {String} level as a name
 * @example
 * getDetailLevelName(2);
 * // 'medium'
 */
export function getDetailLevelName(level) {
  return DETAIL_LEVELS[level - 1];
}

/**
 * Rotates through numbers without going above max depth
 * @param  {Number} [level=1]
 * @return {Number} Previous level incremented by 1 || 1 if above max depth
 */
export function getRotatedLevel(level = 1) {
  const newLevel = level + 1;
  return newLevel > MAX_DETAIL_DEPTH ? 1 : newLevel;
}

/**
 * Combines Common and JLPT with main tags (parts of speech)
 * @param  {Array} tags - pre-existing taglist with parts of speech
 * @param  {String} jlpt - jlpt level as string or null
 * @param  {Bool} common - is word considered common
 * @return {Array} tags list combined with appropriately formatted JLPT and/or Common tags
 * @example
 * combineTags(['Noun', 'Adjective'], null, true);
 * // ['Noun', 'Adjective', 'Common']
 */
export function combineTags(tags, jlpt, common) {
  let ret = tags.slice();
  if (jlpt) ret = ret.push(jlpt);
  if (common) ret = ret.push('Common');
  return ret;
}

/**
 * Removes '〜' or '~' from text
 * @param  {String} text string to remove tilde from
 * @return {String} cleaned string
 * @example
 * stripLeadingTilde('〜回')
 * // '回'
 */
export function stripLeadingTilde(text) {
  return text.replace(new RegExp(`${TILDE_JA}|${TILDE_EN}`, 'gi'), '');
}


/**
 * Splits sentence into head, match & tail for given targets.
 * Preference order is characterss stripped of okurigana, full characters, and finally kana as fallback
 * @param  {String} sentence - sentence to attempt match
 * @param  {String} chars - japanese characters to attempt to match
 * @param  {String} kana - japanese kana to attempt to match
 * @return {Object} head, match, and tail
 * @example
 * splitSentenceByMatch('彼女は私を避けている', '避ける', 'さける');
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export function splitSentenceByMatch(sentence, chars, kana) {
  const [cleanChars, cleanKana] = [stripLeadingTilde(chars), stripLeadingTilde(kana)];
  // TODO: splitOkurigana instead, so we can then use the removed okurigana to strip that from the kana.
  // We should attempt to partial match kana like we do with chars, since some sentences are:
  // "つく" -> "何かがついた"
  // stripOkurigana however won't work on kana since it relies on stopping at the first kanji
  // FINALLY: try matching katakana since some sentences that are kana only should actually be kata
  // for example: 白熊 needs to match シロクマ
  const strippedChars = stripOkurigana(cleanChars);

  const re = new RegExp(`(.*?)(${strippedChars}|${cleanChars}|${cleanKana})(.*)`, 'gi');
  const matches = re.exec(sentence);
  if (matches.length > 3) {
    const [, head, match, tail] = matches;
    return {
      head,
      match,
      tail,
    };
  }
  console.log(matches);
  return {
    head: matches[1],
    match: '',
    tail: matches[3],
  };
}
