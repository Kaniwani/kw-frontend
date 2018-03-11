import { isJapanese } from 'wanakana';
import { endsWith } from 'voca';
import stripTilde from 'common/utils/stripTilde';

export const increment = (x = 0) => x + 1;
export const decrement = (x = 0) => Math.max(0, x - 1);
export const containsZenkakuLatin = (input = '') => /[ａ-ｚ]/gi.test(input);
export const isInputValid = (input = '') =>
  !containsZenkakuLatin(input) && isJapanese(input, /[0-9]/);
export const cleanseInput = (input = '') => fixTerminalN(input.trim());

function flattenReadings([vocab = [], synonyms = []] = []) {
  return [
    ...vocab.map(({ word, primaryReading, secondaryReadings = [] } = {}) => ({
      word,
      readings: [primaryReading, ...secondaryReadings],
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
  const re = new RegExp(`^[〜~]?${cleanedInput}[〜~]?$`);
  return flattenReadings(answers).reduce(
    (ret, { word, readings }) => ([...readings, word].some((vocab) => re.test(vocab)) ? word : ret),
    ''
  );
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
