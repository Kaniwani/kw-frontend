/*
 *
 * AnswerInput actions
 *
 */

import {
  UPDATE_INPUT,
} from './constants';


// TODO: debounce and takeLatest batch fast input in sagas?
export function changeInput(text) { // eslint-disable-line import/prefer-default-export
  return {
    type: UPDATE_INPUT,
    text,
  };
}
