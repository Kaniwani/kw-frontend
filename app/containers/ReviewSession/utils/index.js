import { stripOkurigana } from 'kanawana';
import v from 'voca';

// TODO: get TILDES from kanawana instead?
import {
  MAX_DETAIL_DEPTH,
  DETAIL_LEVELS,
  SRS_RANKS,
  TILDE_JA,
  TILDE_EN,
} from 'shared/constants';

export function getStreakName(streak) {
  switch (true) {
    case (streak > 8): return SRS_RANKS.FIVE;
    case (streak > 7): return SRS_RANKS.FOUR;
    case (streak > 6): return SRS_RANKS.THREE;
    case (streak > 4): return SRS_RANKS.TWO;
    default: return SRS_RANKS.ONE;
  }
}

export function getAllTags(reading) {
  let allTags = reading.tags;
  if (reading.jlpt) allTags = allTags.concat(reading.jlpt);
  if (reading.common) allTags = allTags.concat(reading.common);
  return allTags;
}

export const add = (b) => (a) => a + b;

/**
 * Subtracts b from a, whilst preventing it from becoming negative
 * @param  {Number} b - amount to subtract
 * @return {Number} reduced number or 0
 */
export const subtract = (b) => (a) => Math.max(0, a - b);

/**
 * Helper function to correctly decrement streak value and increase count of incorrect.
 * If user is nearing burned status, they get doubly-decremented.
 * @param  {Number} streak
 * @return {Number} decreased streak or 0 (if decreased streak is negative)
 */
export const getDecreasedStreak = (streak) => {
  const newStreak = streak === 7 ? streak - 2 : streak - 1;
  return Math.max(0, newStreak);
};


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
 * @param  {String} character - japanese characters to attempt to match
 * @param  {String} kana - japanese kana to attempt to match
 * @return {Object} head, match, and tail
 * @example
 * splitSentenceByMatch('彼女は私を避けている', '避ける', 'さける');
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export function splitSentenceByMatch(sentence, character, kana) {
  // TODO: splitOkurigana instead, so we can then use the removed okurigana to strip that from the kana.
  // We should attempt to partial match kana like we do with character, since some sentences are:
  // "つく" -> "何かがついた"
  // stripOkurigana however won't work on kana since it relies on stopping at the first kanji
  // FINALLY: try matching katakana since some sentences that are kana only should actually be kata
  // for example: 白熊 needs to match シロクマ
  try {
    const [cleanChars, cleanKana] = [stripLeadingTilde(character), stripLeadingTilde(kana)];
    const strippedChars = stripOkurigana(cleanChars);
    const re = new RegExp(`(.*?)(${strippedChars}|${cleanChars}|${cleanKana})(.*)`, 'gi');
    const matches = sentence && re.exec(sentence);
    if (matches && matches.length > 3) {
      const [, head, match, tail] = matches;
      return {
        head,
        match,
        tail,
      };
    }
    return {
      head: matches[1],
      match: '',
      tail: matches[3],
    };
  } catch (err) {
    // oh well, just return an unhighlighted sentence
    console.error(err); // eslint-disable-line no-console
    return {
      head: sentence,
    };
  }
}

/**
 * Converts a trailing 'n' to 'ん'
 * @param {string} input text to check and fix
 * @return {string}
 */
export function fixTerminalN(input) {
  return v.endsWith(input, 'n') ? `${input.slice(0, -1)}ん` : input;
}

/**
 * Returns position of Japanese tilde character or false
 * @param  {[Record]} entries
 * @return {string|boolean} - position as string 'start', 'end', or false if none present
 */
export function getTildePosition(entries) {
  const charWithTilde = entries.find(({ character }) => character.includes(TILDE_JA));
  const kanaWithTilde = entries.find(({ kana }) => kana.includes(TILDE_JA));
  const startOrEnd = (text) =>
    (v.startsWith(text, TILDE_JA) && 'start') ||
    (v.endsWith(text, TILDE_JA) && 'end');
  return startOrEnd(charWithTilde) || startOrEnd(kanaWithTilde);
}

/**
 * Appends a Japanese tilde to string if missing, or converts an English tilde to Japanese format
 * @param {string} input text to test and convert
 * @return (string)
 */
export function fixStartingTilde(input) {
  if (v.startsWith(input, TILDE_EN)) {
    return TILDE_JA + input.slice(1);
  } else if (!v.startsWith(input, TILDE_JA)) {
    return TILDE_JA + input;
  }
  return input;
}

/**
 * Prepends a Japanese tilde to string if missing, or converts an English tilde to Japanese format
 * @param {string} input text to test and convert
 * @return (string)
 */
export function fixEndingTilde(input) {
  if (v.endsWith(input, TILDE_EN)) {
    return input.slice(0, -1) + TILDE_JA;
  } else if (!v.endsWith(input, TILDE_JA)) {
    return input + TILDE_JA;
  }
  return input;
}
