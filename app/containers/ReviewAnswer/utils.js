import isEmpty from 'lodash/isEmpty';
// TODO: take tildes from kanawana imo!
import { TILDE_EN, TILDE_JA } from './constants';
import { KEYCODES } from 'shared/constants';

/**
 * Handles key events occuring in ReviewAnswer component
 * @param  {number} event keycode
 * @param  {boolean} whether answer input is disabled or not
 * @return {string|false} function to call if match else false
 */
export function getShortcutAction(keyCode, inputDisabled) {
  const handlers = {
    [KEYCODES.ENTER]: '_processAnswer',
    [KEYCODES.SPACE]: '_toggleInfoDepth',
    [KEYCODES.F_LOWERCASE]: '_toggleInfoPanels',
    [KEYCODES.S_LOWERCASE]: '_showNewSynonymPanel',
    [KEYCODES.I_LOWERCASE]: '_ignoreAnswer',
    [KEYCODES.BACKSPACE]: '_ignoreAnswer',
    [KEYCODES.FORWARD_SLASH]: '_ignoreAnswer',
  };
  let action;
  if (inputDisabled) action = handlers[keyCode];
  return action || false;
}

/**
 * Checks an array of objects to see if a particular key's value matches a target
 * @param  {Object[]} iterable - Iterable containing objects to check
 * @param  {string} key - Key in each object to check value against target
 * @param  {any} target Target - value to test for
 * @return {boolean} True if a match was found
 */
export function keyInIterableMatches(iterable = [], key, target) {
  return iterable.some((item) => item.get(key) === target);
}

/**
 * Checks if answer matches either kana or character strings in answers list
 * @param  {array} [list=[]] Array of vocabulary objects to check against
 * @param  {string} target User input to check with
 * @return {boolean} True if a match was found
 */
export function keysInListMatch(list = [], keys = [], target) {
  return keys.some((key) => keyInIterableMatches(list, key, target));
}

/**
 * Test if a string ends with a suffix
 * @param  {string} str
 * @param  {string} suffix
 * @return {string}
 */
export function endsWith(str, suffix) {
  if (isEmpty(str) || isEmpty(suffix)) return false;
  return str.slice(str.length - suffix.length) === suffix;
}

/**
 * Test if a string starts with a prefix
 * @param  {string} str
 * @param  {string} prefix
 * @return {string}
 */
export function startsWith(str, prefix) {
  if (isEmpty(str) || isEmpty(prefix)) return false;
  return str.slice(0, prefix.length) === prefix;
}

/**
 * Converts a trailing 'n' to 'ん'
 * @param {string} input text to check and fix
 * @return {string}
 */
export function fixTerminalN(input) {
  return endsWith(input, 'n') ? `${input.slice(0, -1)}ん` : input;
}

/**
 * Check if any strings in readings array start with Japanese tilde character
 * @param  {array} readings Japanese readings
 * @return {boolean}
 */
export function answersContainTilde(readings) {
  return readings.some((reading) => startsWith(reading.character, TILDE_JA));
}

/**
 * Appends a Japanese tilde to string if missing, or converts and English tilde to Japanese format
 * @param {string} input text to test and convert
 * @return (string)
 */
export function fixStartingTilde(input) {
  if (startsWith(input, TILDE_EN)) {
    return TILDE_JA + input.slice(1);
  } else if (!startsWith(input, TILDE_JA)) {
    return TILDE_JA + input;
  }
  return input;
}
