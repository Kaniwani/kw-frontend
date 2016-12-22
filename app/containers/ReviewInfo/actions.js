import {
  TOGGLE_VOCAB_INFO,
  TOGGLE_VOCAB_INFO_DEPTH,
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';


/**
 * Toggles the additional vocab info in review
 * @return {object} An action object with a type of TOGGLE_VOCAB_INFO
 */
export function toggleVocabInfo() {
  return {
    type: TOGGLE_VOCAB_INFO,
  };
}

/**
 * Toggles all additional vocab info in review
 * @return {object} An action object with a type of TOGGLE_VOCAB_INFO_DEPTH
 */
export function toggleVocabInfoDepth() {
  return {
    type: TOGGLE_VOCAB_INFO_DEPTH,
  };
}

/**
 * Shows the additional vocab info in review
 * @return {object} An action object with a type of SHOW_VOCAB_INFO
 */
export function showVocabInfo() {
  return {
    type: SHOW_VOCAB_INFO,
  };
}

/**
 * Hides the additional vocab info in review
 * @return {object} An action object with a type of HIDE_VOCAB_INFO
 */
export function hideVocabInfo() {
  return {
    type: HIDE_VOCAB_INFO,
  };
}
