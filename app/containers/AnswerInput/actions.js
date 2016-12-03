/*
 *
 * AnswerInput actions
 *
 */

import {
  INPUT_CHANGED,
  UPDATE_INPUT,
} from './constants';


export function inputChanged(data) {
  return {
    type: INPUT_CHANGED,
    data,
  };
}

export function updateInput(data) {
  return {
    type: UPDATE_INPUT,
    data,
  };
}
