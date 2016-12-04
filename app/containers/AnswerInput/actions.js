/*
 *
 * AnswerInput actions
 *
 */

import {
  UPDATE_INPUT,
} from './constants';

export function updateInput(data) { // eslint-disable-line import/prefer-default-export
  return {
    type: UPDATE_INPUT,
    data,
  };
}
