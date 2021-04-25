import { isJapanese } from 'wanakana';
import { endsWith } from 'voca';
import stripTilde from 'common/utils/stripTilde';

export const increment = (x = 0) => x + 1;
export const decrement = (x = 0) => Math.max(0, x - 1);
export const containsZenkakuLatin = (input = '') => /[ａ-ｚ]/gi.test(input);
export const isInputValid = (input = '') =>
  !containsZenkakuLatin(input) && isJapanese(input, /[0-9]|[０-９]/);
export const cleanseInput = (input = '') => fixTerminalN(input.trim());

function flattenReadings([vocab = [], synonyms = [], defaultReadingSynonyms = []] = []) {
  return [
    ...vocab.map(({ word, primaryReading, secondaryReadings = [] } = {}) => ({
      word,
      readings: [primaryReading, ...secondaryReadings, ...defaultReadingSynonyms],
    })),
    ...synonyms.map(({ word, primaryReading } = {}) => ({
      word,
      readings: [primaryReading],
    })),
  ];
}

/**
 * Compares input to answers - ignoring any tildes
 * @param  {String} [input=""] user input
 * @param  {[Object]} [answers=[]] allowed answer vocab/synonym items
 * @return {String} matched answer (incl. relevant tildes) or ""
 */
export function matchAnswer(input = '', answers = []) {
  const cleanedInput = stripTilde(input);
  const answerList = flattenReadings(answers);
  const hasTilde = (text = '') => (vocab = '') => RegExp(`^[〜~]?${text}[〜~]?$`).test(vocab);

  const findMatch = (text) =>
    answerList.reduce(
      (ret, { word, readings }) => ([...readings, word].some(hasTilde(text)) ? word : ret),
      ''
    );

  return findMatch(cleanedInput) || findMatch(fixHandwriting(cleanedInput));
}

/**
 * Converts a trailing 'n' to 'ん'
 * @param {string} input text to check and fix
 * @return {string} text with trailing 'n' -> 'ん'
 */
export function fixTerminalN(input = '') {
  const en = 'n';
  const ja = 'ｎ';
  return endsWith(input, en) || endsWith(input, ja) ? `${input.slice(0, -1)}ん` : input;
}

/**
 * Convert katakana masquerading as kanji (from handwriting input) to their respective kanji
 * @param {string} [input=''] text to fix: 人ロ (katakana 'ro')
 * @returns {string} text with kana replaced as kanji: 人口 (kanji 'kou')
 */
export function fixHandwriting(input = '') {
  return [...input].map((c) => LOOKALIKES[c] || c).join('');
}

// katakana and their kanji equivalents
const LOOKALIKES = {
  ー: '一',
  ロ: '口',
  カ: '力',
  ニ: '二',
  エ: '工',
  タ: '夕',
  ト: '卜',
  ハ: '八',
};
