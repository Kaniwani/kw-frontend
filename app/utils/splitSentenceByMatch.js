import { toKatakana, stripOkurigana, tokenize } from 'wanakana';

import stripTilde from './stripTilde';

// [x, y] => 'x|y'
const joinPipe = (arr) => arr.join('|');

/**
 * Splits sentence into head, match, & tail.
 * Attempts to match characters, hiragana, katakana; or smart partial matches without okurigana.
 * @param  {String} [sentence=''] - sentence to attempt match
 * @param  {String} [word=''] - japanese word to attempt to match
 * @param  {String} [reading=''] - japanese kana to attempt to match
 * @return {Object} head, match, and tail
 * @example
 * splitSentenceByMatch('彼女は私を避けている', '避ける', 'さける');
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export default function splitSentenceByMatch(sentence = '', word = '', reading = '') {
  const stripKana = (k) => k.replace(tokenize(cleanChars).pop(), '') || k;
  const hasChars = !!word.length;
  const hasKana = !!reading.length;
  let cleanChars;
  let strippedChars;
  let onlyChars;
  let cleanKana;
  let cleanKata;
  let strippedKana;

  if (hasChars) {
    cleanChars = stripTilde(word); // '〜漬け' => '漬け'
    strippedChars = stripOkurigana(cleanChars); // '飛び込む' => '飛び込'
    onlyChars = stripOkurigana(cleanChars, { all: true }); // '売り上げ' => '売上'
  }

  const charRegex = hasChars ? joinPipe([cleanChars, strippedChars, onlyChars]) : '';

  if (hasKana) {
    cleanKana = stripTilde(reading); // '〜つけ' => 'つけ'
    cleanKata = toKatakana(cleanKana); // '〜つけ' => 'ツケ'
    strippedKana = stripKana(cleanKana); // '〜つけ' => 'つ'
  }

  const kanaRegex = hasKana ? `${joinPipe([cleanKana, cleanKata, strippedKana])}` : '';

  // '売り上げ' => /(.*?)(売り上げ|売り上|売上|うりあげ|ウリアゲ|うりあ)(.*)/
  const regex = new RegExp(`(.*?)(${charRegex}${hasChars && hasKana ? '|' : ''}${kanaRegex})(.*)`);

  const failSafe = ['', sentence, '', ''];

  const [, head, match, tail] = sentence.match(regex) || failSafe;

  return {
    head,
    match,
    tail,
  };
}
