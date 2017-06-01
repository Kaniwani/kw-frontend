import isKanji from 'kanawana/isKanji';
import isJapanese from 'kanawana/isJapanese';
import isKana from 'kanawana/isKana';

/**
 * Validation functions for use with Redux-Form Fields
 */

export const onlyKanjiKana = value =>
  (!isJapanese(value)) ?
  'Must be a mix of kanji and okurigana' : undefined;

export const onlyKana = value =>
  !isKana(value) ? 'Must be hiragana or katakana' : undefined;

export const onlyKanjiOrKana = value =>
  (isKanji(value) || isJapanese(value) || isKana(value)) ?
  undefined : 'Must be kana, kanji, or a mix of both';

export const required = value =>
  value ? undefined : 'Required';

export const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const number = value =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;
