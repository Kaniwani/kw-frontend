import endsWith from 'voca/ends_with';

/**
 * Converts a trailing 'n' to 'ん'
 * @param {string} input text to check and fix
 * @return {string} text with trailing 'n' -> 'ん'
 */
function fixTerminalN(input = '') {
  return endsWith(input, 'n') ? `${input.slice(0, -1)}ん` : input;
}

export default fixTerminalN;
