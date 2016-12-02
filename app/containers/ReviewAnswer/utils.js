import isEmpty from 'utils/isEmpty';

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
export function addTerminalN(input) {
  return endsWith(input, 'n') ? `${input.slice(0, -1)}ん` : input;
}

/**
 * Appends a Japanese tilde to string if missing, or converts and English tilde to Japanese format
 * @param {string} input text to test and convert
 * @return (string)
 */
export function addStartingTilde(input) {
  const tildeJA = '〜';
  const tildeEN = '~';
  if (startsWith(input, tildeEN)) {
    return tildeJA + input.slice(1);
  } else if (!startsWith(input, tildeJA)) {
    return tildeJA + input;
  }
  return input;
}
