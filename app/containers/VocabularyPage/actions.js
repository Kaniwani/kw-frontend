/*
 *
 * VocabularyPage actions
 *
 */

import {
  LOAD_VOCAB_LEVELDATA,
  LOAD_VOCAB_LEVELDATA_SUCCESS,
  LOAD_VOCAB_LEVELDATA_ERROR,
} from './constants';

export function getVocabularyLevels() { // eslint-disable-line import/prefer-default-export
  return {
    type: LOAD_VOCAB_LEVELDATA,
  };
}
export function vocabularyLevelsDataLoaded(data) { // eslint-disable-line import/prefer-default-export
  return {
    type: LOAD_VOCAB_LEVELDATA_SUCCESS,
    payload: data,
  };
}
export function vocabularyLevelsDataLoadingError(error) { // eslint-disable-line import/prefer-default-export
  return {
    type: LOAD_VOCAB_LEVELDATA_ERROR,
    payload: error,
  };
}
