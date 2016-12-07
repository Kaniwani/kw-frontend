import {
  SHOW_VOCAB_INFO,
  HIDE_VOCAB_INFO,
} from './constants';


/**
 * Sets the additional vocab info in review to visible
 * @param {object} payload Object to merge into vocabInfo allowing you to set items independently
 * @return {object} An action object with a type of SHOW_VOCAB_INFO and an optional payload of data to merge into answerInfo
 */
export function showVocabInfo(payload = { charactersVisible: true, kanaVisible: true }) {
  return {
    type: SHOW_VOCAB_INFO,
    payload,
  };
}


/**
 * Sets the additional vocab info in review to hidden
 * @return {object} An action object with a type of HIDE_VOCAB_INFO and an optional payload of data to merge into answerInfo
 */
export function hideVocabInfo(payload = { charactersVisible: false, kanaVisible: false }) {
  return {
    type: HIDE_VOCAB_INFO,
    payload,
  };
}
