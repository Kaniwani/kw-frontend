/*
 *
 * AnswerInput actions
 *
 */

import {
  UPDATE_INPUT,
} from './constants';


// TODO: use debounce (100ms?) and takeLatest in sagas to batch fast user input
export function changeInput(text) { // eslint-disable-line import/prefer-default-export
  return {
    type: UPDATE_INPUT,
    text,
  };
}
