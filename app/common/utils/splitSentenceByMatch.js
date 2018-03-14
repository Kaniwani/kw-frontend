import { toKatakana, stripOkurigana, tokenize } from 'wanakana';
import stripTilde from './stripTilde';
import { inflect } from './conjugate';

/**
 * @typedef {Object} splitSentenceByMatchReturn
 * @property {string} head - pre-match sentence text
 * @property {string} match - matched string
 * @property {string} tail - post-match sentence text
 */

/**
 * @typedef {Object} splitSentenceByMatchParams
 * @property {String} splitSentenceByMatchParams.sentence - sentence
 * @property {String} splitSentenceByMatchParams.word - vocab word
 * @property {String} splitSentenceByMatchParams.reading - primary vocab word reading
 * @property {String} splitSentenceByMatchParams.verbType - verb type tag IE: 'v1', 'v5', 'v5u'
 */

/**
 * Splits sentence into head, match, & tail.
 * Attempts to match word, hiragana, katakana; or smart partial matches without okurigana.
 * @param {Object} splitSentenceByMatchParams - vocab object
 * @returns {splitSentenceByMatchReturn} - sentence split with match
 * @example
 * splitSentenceByMatch({ sentence: '彼女は私を避けている', word: '避ける', reading: 'さける'});
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export default function splitSentenceByMatch({
  sentence = '',
  word = '',
  reading = '',
  verbType = '',
} = {}) {
  const stripKana = (kana, cleanWord) => kana.replace(tokenize(cleanWord).pop(), '');
  const makeRegex = (toMatch) => new RegExp(`(.*)(${toMatch})(.*)`);
  const hasWord = !!word.length;
  const hasReading = !!reading.length;
  const cleanWord = stripTilde(word);
  let matched = null;
  let matchers = [];

  if (hasWord) {
    matchers.push(cleanWord);
    if (verbType) {
      matchers.push(
        ...inflect(word, verbType)
          .map(({ form }) => form)
          .sort((a, b) => b.length - a.length)
      );
    }
    matchers.push(stripOkurigana(cleanWord)); // '飛び込む' => '飛び込'
    matchers.push(stripOkurigana(cleanWord, { all: true })); // '売り上げ' => '売上'
    matchers = [...new Set(matchers)];

    while (matchers.length) {
      const matcher = matchers.shift();
      matched = sentence.match(makeRegex(matcher));
      if (matched !== null) {
        const [, head, match, tail] = matched;
        return { head, match, tail };
      }
    }
  }

  if (hasReading) {
    const cleanKana = stripTilde(reading);
    matchers = [cleanKana];
    if (verbType) {
      matchers.push(
        ...inflect(reading, verbType)
          .map(({ form }) => form)
          .sort((a, b) => b.length - a.length)
      );
    }
    matchers.push(toKatakana(cleanKana)); // '〜つけ' => 'ツケ'
    matchers.push(stripKana(cleanKana, cleanWord)); // '〜つけ' => 'つ'
    matchers = [...new Set(matchers)];

    while (matchers.length) {
      const matcher = matchers.shift();
      matched = sentence.match(makeRegex(matcher));
      if (matched !== null) {
        const [, head, match, tail] = matched;
        return { head, match, tail };
      }
    }
  }

  return { head: sentence, match: '', tail: '' };
}
