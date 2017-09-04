import { endsWith } from 'voca';

/**
 * Converts a trailing 'n' to 'ん'
 * @param {string} input text to check and fix
 * @return {string} text with trailing 'n' -> 'ん'
 */
function fixTerminalN(input = '') {
  const en = 'n';
  const ja = 'ｎ';
  return (endsWith(input, en) || endsWith(input, ja)) ? `${input.slice(0, -1)}ん` : input;
}

export default fixTerminalN;
