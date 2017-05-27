import stripOkurigana from 'kanawana/stripOkurigana';
import toKatakana from 'kanawana/toKatakana';

import stripLeadingTilde from './stripLeadingTilde';

/**
 * Splits sentence into head, match & tail for given targets.
 * Preference order is characterss stripped of okurigana, full characters, and finally kana as fallback
 * @param  {String} [sentence=''] - sentence to attempt match
 * @param  {String} [character=''] - japanese characters to attempt to match
 * @param  {String} [kana=''] - japanese kana to attempt to match
 * @return {Object} head, match, and tail
 * @example
 * splitSentenceByMatch('彼女は私を避けている', '避ける', 'さける');
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export default function splitSentenceByMatch(sentence = '', character = '', kana = '') {
  // TODO: splitOkurigana as well, so we can then use the removed okurigana to strip that from the kana.
  // We should attempt to partial match kana like we do with character, since some sentences are:
  // "つく" -> "何かがついた"
  // stripOkurigana however won't work on kana since it relies on stopping at the first kanji
  // We could save the stripped trailing okurigana, then slice it off the kana
  try {
    const [cleanChars, cleanKana] = [stripLeadingTilde(character), stripLeadingTilde(kana)];
    const cleanKata = toKatakana(cleanKana);
    const strippedChars = stripOkurigana(cleanChars);
    let re;
    if (character && kana) {
      re = new RegExp(`(.*?)(${cleanChars}|${strippedChars}|${cleanKana}|${cleanKata})(.*)`, 'gi');
    } else if (!kana) {
      re = new RegExp(`(.*?)(${cleanChars}|${strippedChars})(.*)`, 'gi');
    } else {
      re = new RegExp(`(.*?)(${cleanKana}|${cleanKata})(.*)`, 'gi');
    }

    const [, head, match, tail] = re.exec(sentence) || ['', sentence, '', ''];

    return {
      head,
      match,
      tail,
    };
  } catch (err) {
    // oh well, just return an unhighlighted sentence
    console.error(err); // eslint-disable-line no-console
    return {
      head: sentence,
      match: '',
      tail: '',
    };
  }
}
