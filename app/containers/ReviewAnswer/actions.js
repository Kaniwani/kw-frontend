import {
  CHECK_ANSWER,
  UPDATE_ANSWER,
  PROCESS_ANSWER,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
} from './constants';

/**
 * Checks answer textInput to see if it matches review readings
 * @return {object} An action object with a type of CHECK_ANSWER
 */
export function checkAnswer() {
  return {
    type: CHECK_ANSWER,
  };
}

/**
 * Checks answer textInput to see if it matches review readings
 * @param {object} payload Answer state updates
 * @return {object} An action object with a type of UPDATE_ANSWER and updated data
 */
export function updateAnswer(payload) {
  return {
    type: UPDATE_ANSWER,
    payload,
  };
}

/**
 * Records answer as correct/incorrect on server, updates state stats
 * @return {object} An action object with a type of PROCESS_ANSWER
 */
export function processAnswer() {
  return {
    type: PROCESS_ANSWER,
  };
}


/**
* Marks current review item as correct and updates item's session data
* @return {object} An action object with a type of MARK_CORRECT
*/
export function markCorrect() {
  return {
    type: MARK_CORRECT,
  };
}

/**
* Marks current review item as incorrect and updates item's session data
* @return {object} An action object with a type of MARK_INCORRECT
*/
export function markIncorrect() {
  return {
    type: MARK_INCORRECT,
  };
}

/**
* Marks current review item as ignored and updates item's session data
* @param {boolean} correct Whether the item is currently marked as correct or not
* @return {object} An action object with a type of MARK_IGNORED and a payload of the current correctness mark
*/
export function markIgnored(correctness) {
  return {
    type: MARK_IGNORED,
    payload: correctness,
  };
}
