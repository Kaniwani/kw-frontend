/*
 *
 * AnswerInput actions
 *
 */

import {
  CHANGE_INPUT,
} from './constants';

export function changeInput(text) { // eslint-disable-line import/prefer-default-export
  return {
    type: CHANGE_INPUT,
    text,
  };
}
