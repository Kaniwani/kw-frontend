import isEmpty from 'lodash/isEmpty';
// TODO: move tildes to kanawana imo
import { TILDE_EN, TILDE_JA } from './constants';
import { KEYS } from 'shared/constants';

/**
 * Handles key events occuring in ReviewAnswer component
 * @param  {object} event
 * @return {string|false} function to call if match else false
 */
export function getShortcutAction(keyCode, disabled) {
  const handlers = {
    [KEYS.ENTER]: '_processAnswer',
    [KEYS.SPACE]: '_toggleInfoDepth',
    [KEYS.F_LOWERCASE]: '_toggleInfoPanels',
    [KEYS.S_LOWERCASE]: '_showNewSynonymPanel',
    [KEYS.I_LOWERCASE]: '_ignoreAnswer',
    [KEYS.BACKSPACE]: '_ignoreAnswer',
    [KEYS.FORWARD_SLASH]: '_ignoreAnswer',
  };
  let action;
  if (disabled) action = handlers[keyCode];
  return action || false;
}

/**
 * Checks an array of objects to see if a particular key's value matches a target
 * @param  {Object[]} list - List of objects to check
 * @param  {string} key - Key in each object to check value against target
 * @param  {any} target Target - value to test for
 * @return {boolean} True if a match was found
 */
export function keyInListMatches(list = [], key, target) {
  return list.some((obj) => obj[key] === target);
}

/**
 * Checks if answer matches either kana or character strings in answers list
 * @param  {array} [list=[]] Array of vocabulary objects to check against
 * @param  {string} target User input to check with
 * @return {boolean} True if a match was found
 */
export function keysInListMatch(list = [], keys = [], target) {
  return keys.some((key) => keyInListMatches(list, key, target));
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

// TODO: refactor for more general use
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
