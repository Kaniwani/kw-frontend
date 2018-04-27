import { toKatakana, stripOkurigana } from 'wanakana';
import { inflectVerb, inflectAdjective } from './conjugate';
import stripTilde from './stripTilde';

const makeRegex = (toMatch) => new RegExp(`(.*)(${toMatch})(.*)`);

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
 * @property {String} splitSentenceByMatchParams.adjType - adj type tag IE: 'adj-i', 'adj-ix'
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
  adjType = '',
} = {}) {
  const [cleanWord, cleanReading] = [stripTilde(word), stripTilde(reading)];

  if (cleanWord.length) {
    const wordResult = findMatch(sentence, createMatchers(cleanWord, '', verbType, adjType));
    if (wordResult.match) {
      return wordResult;
    }
  }

  if (cleanReading.length) {
    const readingResult = findMatch(
      sentence,
      createMatchers(cleanWord, cleanReading, verbType, adjType)
    );
    if (readingResult.match) {
      return readingResult;
    }
  }

  return { head: sentence, match: '', tail: '' };
}

function createMatchers(word = '', reading = '', verbType = '', adjType = '') {
  const base = reading || word;
  const matchers = [base];

  if (verbType) {
    matchers.push(
      ...inflectVerb(base, verbType)
        .map(({ form }) => form)
        .sort((a, b) => b.length - a.length)
    );
  } else if (adjType) {
    matchers.push(
      ...inflectAdjective(base, adjType)
        .map(({ form }) => form)
        .sort((a, b) => b.length - a.length)
    );
    // basic stem matching fallback if no verbType or adjType provided
  } else if (reading) {
    // 'づけ' => 'づ' via 漬け
    matchers.push(stripOkurigana(base, { matchKanji: word }));
    // 'おかね' => 'かね' via お金
    matchers.push(stripOkurigana(base, { matchKanji: word, leading: true }));
    // 'つけ' => 'ツケ'
    matchers.push(toKatakana(base));
  } else {
    matchers.push(stripOkurigana(base)); // '飛び込む' => '飛び込'
    matchers.push(stripOkurigana(base, { leading: true })); // 'お金' => '金'
  }

  return [...new Set(matchers)];
}

function findMatch(sentence = '', matchers = []) {
  let matched;
  while (matchers.length) {
    const matcher = matchers.shift();
    matched = sentence.match(makeRegex(matcher));
    if (matched !== null) {
      const [, head, match, tail] = matched;
      return { head, match, tail };
    }
  }
  return {};
}
