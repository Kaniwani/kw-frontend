import isKanji from 'wanakana/isKanji';
import isJapanese from 'wanakana/isJapanese';
import isKana from 'wanakana/isKana';

export const onlyKanjiKana = (value = '') =>
  isJapanese(value) ? undefined : 'Must be a mix of kanji and okurigana';

export const onlyKana = (value = '') =>
  isKana(value) ? undefined : 'Must be hiragana or katakana';

export const onlyKanjiOrKana = (value = '') =>
  (isKanji(value) || isJapanese(value) || isKana(value)) ?
    undefined : 'Must be kana, kanji, or a mix of both';

export const valueMatches = (value, matcher) =>
  value && value === matcher ? undefined : 'Does not match';

export const requiredValid = (value) =>
  value ? undefined : 'Required';

export const passwordValid = (value) =>
  value && value.length > 4 ? undefined : 'Length must be greater than 4';

export const numberValid = (value) =>
  !value || !isNaN(Number(value)) ? undefined : 'Must be a number';

export const emailValid = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? undefined : 'Invalid email address';
