import stripOkurigana from 'kanawana/stripOkurigana';
import toKatakana from 'kanawana/toKatakana';
import tokenize from 'kanawana/tokenize';

import stripTilde from './stripTilde';

// [x, y] => 'x|y'
const joinPipe = arr => arr.join('|');

/**
 * Splits sentence into head, match, & tail.
 * Attempts to match characters, hiragana, katakana; or smart partial matches without okurigana.
 * @param  {String} [sentence=''] - sentence to attempt match
 * @param  {String} [character=''] - japanese characters to attempt to match
 * @param  {String} [kana=''] - japanese kana to attempt to match
 * @return {Object} head, match, and tail
 * @example
 * splitSentenceByMatch('彼女は私を避けている', '避ける', 'さける');
 * // { head: '彼女は私を', match: '避', tail: 'けている' }
 */
export default function splitSentenceByMatch(sentence = '', character = '', kana = ['']) {
  const cleanChars = stripTilde(character); // '〜漬け' => '漬け'
  const strippedChars = stripOkurigana(cleanChars); // '飛び込む' => '飛び込'
  const onlyChars = stripOkurigana(cleanChars, { all: true }); // '売り上げ' => '売上'
  const cleanKana = kana.map(stripTilde); // ['〜つけ'] => ['つけ']
  const cleanKata = cleanKana.map(toKatakana); // ['〜つけ'] => ['ツケ']
  const stripKana = k => k.replace(tokenize(cleanChars).pop(), '') || k;
  const strippedKana = cleanKana.map(stripKana); // ['〜つけ'] => ['つ']

  // '売り上げ' => /(.*?)(売り上げ|売り上|売上|うりあげ|ウリアゲ|うりあ)(.*)/
  const regex = new RegExp(`(.*?)(${
    joinPipe([cleanChars, strippedChars, onlyChars])
  }|${
    joinPipe([cleanKana, cleanKata, strippedKana].map(joinPipe))
  })(.*)`);

  const failSafe = ['', sentence, '', ''];

  const [, head, match, tail] = sentence.match(regex) || failSafe;

  return {
    head,
    match,
    tail,
  };
}
