import { isJapanese } from 'wanakana';
import { endsWith } from 'voca';
import { flatMap } from 'lodash';
import stripTilde from 'common/utils/stripTilde';

export const increment = (x = 0) => x + 1;
export const decrement = (x = 0) => Math.max(0, x - 1);
export const containsZenKaku = (input = '') => /[ａ-ｚ]/gi.test(input);
export const isInputValid = (input = '') => !containsZenKaku(input) && isJapanese(input);
export const cleanseInput = (input = '') => fixTerminalN(input.trim());

const cleanAnswer = (text) => ({
  original: text,
  cleaned: stripTilde(text),
});

/**
 * Compares input to answers - ignoring any tildes
 * @param  {String} [input=""] user input
 * @param  {[String]} [answers=[]] allowed answers
 * @return {String} matched answer (incl. relevant tildes) or ""
 */
export function matchAnswer(input = '', answers = []) {
  const cleanedInput = stripTilde(input);
  const cleanedAnswers = answers.map(cleanAnswer);
  const match = cleanedAnswers.find(({ cleaned }) => cleaned === cleanedInput);
  return match ? match.original : '';
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
 * Combines vocab and synonym objects into a flat list of possible answers
 * @param  {Array} [vocab=[]] - vocab entries
 * @param  {Array} [synonyms=[]] - synonym entries
 * @return {[String]} combined answers
 */
export function combineAnswers(vocab = [], synonyms = []) {
  return [
    ...flatMap(vocab, ({ word, primaryReading, secondaryReadings = [] } = {}) => [
      word,
      primaryReading,
      ...secondaryReadings,
    ]),
    ...flatMap(synonyms, ({ word, primaryReading } = {}) => [word, primaryReading]),
  ].filter(Boolean); // remove "" || undefined
}

export default combineAnswers;
