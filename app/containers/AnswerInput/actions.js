/*
 *
 * AnswerInput actions
 *
 */

import {
  UPDATE_INPUT,
} from './constants';

export function updateInput(text) { // eslint-disable-line import/prefer-default-export
  return {
    type: UPDATE_INPUT,
    payload: text,
  };
}
