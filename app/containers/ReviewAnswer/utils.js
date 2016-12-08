import isEmpty from 'lodash/isEmpty';
import { TILDE_EN, TILDE_JA } from './constants';
import { KEYS } from 'shared/constants';

export function handleShortcuts(event, self) {
  const keyCode = event.which;
  switch (true) {
    case (keyCode === KEYS.ENTER):
      self.process(event);
      break;

    // Pressing P toggles phonetic reading
    case (keyCode === KEYS.P_LOWERCASE || keyCode === KEYS.P_UPPERCASE):
      self.toggleInfo({ kana: true });
      break;

    // Pressing K toggles the actual kanji reading.
    case (keyCode === KEYS.K_LOWERCASE || keyCode === KEYS.K_UPPERCASE):
      self.toggleInfo({ characters: true });
      break;

    // Pressing F toggles both item info boxes.
    case (keyCode === KEYS.F_LOWERCASE || keyCode === KEYS.F_UPPERCASE):
      self.toggleInfo({ characters: true, kana: true });
      break;

    // Pressing S toggles add synonym modal.
    case (keyCode === KEYS.S_LOWERCASE || keyCode === KEYS.S_UPPERCASE):
      self.showAddAnswerSynonym();
      break;

    // Pressing I ignores answer when input has been marked incorrect
    case (keyCode === KEYS.I_LOWERCASE || keyCode === KEYS.I_UPPERCASE ||
          keyCode === KEYS.BACKSPACE || keyCode === KEYS.FORWARD_SLASH):
      self.ignore(event);
      break;
    default: console.log('key handler fall through'); // eslint-disable-line no-console
  }
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