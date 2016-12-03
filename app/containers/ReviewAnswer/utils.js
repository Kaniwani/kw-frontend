import isEmpty from 'utils/isEmpty';

/**
 * Checks an array of objects to see if a particular key's value matches a target
 * @param  {Object[]} list - List of objects to check
 * @param  {string} key - Key in each object to check value against target
 * @param  {any} target Target - value to test for
 * @return {boolean} True if a match was found
 */
export function keyInListMatches(list, key, target) {
  return list.some((obj) => obj[key] === target);
}

/**
 * Checks if answer matches either kana or character strings in answers list
 * @param  {array} answers Array of vocabulary objects to check against
 * @param  {string} input User input to check with
 * @return {boolean} True if a match was found
 */
export function answerMatches(answers, input) {
  return keyInListMatches(answers, 'kana', input) || keyInListMatches(answers, 'character', input);
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

const tildeJA = '〜';
const tildeEN = '~';
/**
 * Check if any strings in readings array start with Japanese tilde character
 * @param  {array} readings Japanese readings
 * @return {boolean}
 */
export function answersContainTilde(readings) {
  return readings.some((reading) => startsWith(reading.character, tildeJA));
}

/**
 * Appends a Japanese tilde to string if missing, or converts and English tilde to Japanese format
 * @param {string} input text to test and convert
 * @return (string)
 */
export function fixStartingTilde(input) {
  if (startsWith(input, tildeEN)) {
    return tildeJA + input.slice(1);
  } else if (!startsWith(input, tildeJA)) {
    return tildeJA + input;
  }
  return input;
}
