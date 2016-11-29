import {
  HIRAGANA_END,
  HIRAGANA_START,
  KATAKANA_END,
  KATAKANA_START,
  PROLONGED_SOUND_MARK,
  KANA_SLASH_DOT,
  LOWERCASE_FULLWIDTH_END,
  LOWERCASE_FULLWIDTH_START,
  LOWERCASE_START,
  UPPERCASE_FULLWIDTH_END,
  UPPERCASE_FULLWIDTH_START,
  UPPERCASE_END,
  UPPERCASE_START,
} from './constants';


// Returns a substring based on start/end values
export const getChunk = (str, start, end) => str.slice(start, end);

// Don't pick a chunk that is bigger than the remaining characters.
export const getChunkSize = (max, remaining) => Math.min(max, remaining);

// Checks if char is in English unicode uppercase range
export const isCharUpperCase = (char) => isCharInRange(char, UPPERCASE_START, UPPERCASE_END);

/**
 * Takes a character and a unicode range. Returns true if the char is in the range.
 * @param  {string}  char  unicode character
 * @param  {number}  start unicode start range
 * @param  {number}  end   unicode end range
 * @return {Boolean}
 */
export function isCharInRange(char, start, end) {
  const code = char.charCodeAt(0);
  return start <= code && code <= end;
}

/**
 * Tests a character and an english vowel. Returns true if the char is a vowel.
 * @param  {string} char
 * @param  {Boolean} [includeY=true] Optional parameter to include y as a vowel in test
 * @return {Boolean}
 */
export function isCharVowel(char, includeY = true) {
  const regexp = includeY ? /[aeiouy]/ : /[aeiou]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
}

/**
 * Tests a character and an english consonant. Returns true if the char is a consonant.
 * @param  {string} char
 * @param  {Boolean} [includeY=true] Optional parameter to include y as a consonant in test
 * @return {Boolean}
 */
export function isCharConsonant(char, includeY = true) {
  const regexp = includeY ? /[bcdfghjklmnpqrstvwxyz]/ : /[bcdfghjklmnpqrstvwxz]/;
  return char.toLowerCase().charAt(0).search(regexp) !== -1;
}

// Returns true if char is 'ー'
export function isCharLongDash(char) {
  return char.charCodeAt(0) === PROLONGED_SOUND_MARK;
}

// Returns true if char is '・'
export function isCharSlashDot(char) {
  return char.charCodeAt(0) === KANA_SLASH_DOT;
}

/**
 * Tests a character. Returns true if the character is katakana.
 * @param  {string} char character string to test
 * @return {Boolean}
 */
export function isCharKatakana(char) {
  return isCharInRange(char, KATAKANA_START, KATAKANA_END);
}

/**
 * Tests a character. Returns true if the character is Hiragana.
 * @param  {string} char character string to test
 * @return {Boolean}
 */
export function isCharHiragana(char) {
  if (isCharLongDash(char)) return true;
  return isCharInRange(char, HIRAGANA_START, HIRAGANA_END);
}

/**
 * Tests a character. Returns true if the character is hiragana or katakana.
 * @param  {string} char character string to test
 * @return {Boolean}
 */
export function isCharKana(char) {
  return isCharHiragana(char) || isCharKatakana(char);
}

/**
 * Tests a character. Returns true if the character is not hiragana or katakana.
 * @param  {string} char character string to test
 * @return {Boolean}
 */
export function isCharNotKana(char) {
  return !isCharHiragana(char) && !isCharKatakana(char);
}

/**
 * Converts all fullwidth roman letters in string to proper ASCII
 * @param  {string} str Full Width roman letters
 * @return {string} ASCII
 */
export function convertFullwidthCharsToASCII(str) {
  const asciiChars = str.split('').map((char) => {
    const code = char.charCodeAt(0);
    const lower = isCharInRange(char, LOWERCASE_FULLWIDTH_START, LOWERCASE_FULLWIDTH_END);
    const upper = isCharInRange(char, UPPERCASE_FULLWIDTH_START, UPPERCASE_FULLWIDTH_END);
    if (lower) {
      return String.fromCharCode((code - LOWERCASE_FULLWIDTH_START) + LOWERCASE_START);
    } else if (upper) {
      return String.fromCharCode((code - UPPERCASE_FULLWIDTH_START) + UPPERCASE_START);
    }
    return char;
  });

  return asciiChars.join('');
}
