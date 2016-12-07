import {
  TOGGLE_VOCAB_INFO,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';


/**
 * Toggles the additional vocab info in review to options passed in payload
 * @param {object} payload Object of keys to toggle in vocabInfo { characters, kana }
 * @return {object} An action object with a type of TOGGLE_VOCAB_INFO and a payload of options
 */
export function toggleVocabInfo(payload = {}) {
  return {
    type: TOGGLE_VOCAB_INFO,
    payload,
  };
}

/**
 * Sets all vocab info visibility to true
 */
export function showVocabInfo() {
  return {
    type: SHOW_VOCAB_INFO,
  };
}

/**
* Sets all vocab info visibility to false
*/
export function hideVocabInfo() {
  return {
    type: HIDE_VOCAB_INFO,
  };
}
