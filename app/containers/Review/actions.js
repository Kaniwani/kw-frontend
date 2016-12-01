/*
 * Review Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_REVIEWDATA,
  LOAD_REVIEWDATA_SUCCESS,
  LOAD_REVIEWDATA_ERROR,
  SET_NEW_CURRENT,
  RETURN_CURRENT_TO_QUEUE,
  MOVE_CURRENT_TO_COMPLETED,
  CHECK_ANSWER,
  PROCESS_ANSWER,
  MARK_CORRECT,
  MARK_INCORRECT,
  MARK_IGNORED,
  INCREASE_SESSION_CORRECT,
  INCREASE_SESSION_INCORRECT,
  INCREASE_STREAK,
  DECREASE_STREAK,
  RESET_STREAK,
} from './constants';

/**
 * Load the reviewData, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA
 */
export function loadReviewData() {
  return {
    type: LOAD_REVIEWDATA,
  };
}

/**
 * Dispatched when the review data is loaded by the request saga
 *
 * @param  {object} reviewData The review data
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_SUCCESS passing the review data
 */
export function reviewDataLoaded(data) {
  return {
    type: LOAD_REVIEWDATA_SUCCESS,
    payload: data,
  };
}

/**
 * Dispatched when loading the reviewData fails
 *
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of LOAD_REVIEWDATA_ERROR passing the error
 */
export function reviewDataLoadingError(error) {
  return {
    type: LOAD_REVIEWDATA_ERROR,
    payload: error,
  };
}

/**
 * Dispatched when rotating in next vocab question
 *
 * @return {object} An action object with a type of SET_NEW_CURRENT
 */
export function setNewCurrent() {
  return {
    type: SET_NEW_CURRENT,
  };
}

/**
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function returnCurrentToQueue() {
  return {
    type: RETURN_CURRENT_TO_QUEUE,
  };
}
/**
 * Inserts current review back into the reviews queue at a random insertion point
 * @return {object} An action object with a type of RETURN_CURRENT_TO_QUEUE
 */
export function moveCurrentToCompleted() {
  return {
    type: MOVE_CURRENT_TO_COMPLETED,
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

/**
 * Increases the streak count by 1 on the current review item
 * @param {number} previousStreak The previous streak number to be stored for RESET_STREAK action
 * @return {object} An action object with a type of INCREASE_STREAK and a payload of the previous streak
 */
export function increaseStreak(previousStreak) {
  return {
    type: INCREASE_STREAK,
    payload: previousStreak,
  };
}

/**
 * Decreases the streak count by 1 on the current review item
 * @param {number} previousStreak The previous streak number to be stored for RESET_STREAK action
 * @return {object} An action object with a type of DECREASE_STREAK and a payload of the previous streak
 */
export function decreaseStreak(previousStreak) {
  return {
    type: DECREASE_STREAK,
    payload: previousStreak,
  };
}

/**
 * Resets the streak count on the current review item to the stored previous streak count
 * @return {object} An action object with a type of RESET_STREAK
 */
export function resetStreak() {
  return {
    type: RESET_STREAK,
  };
}

/**
 * Increases the session total correct count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_CORRECT
 */
export function increaseSessionCorrect() {
  return {
    type: INCREASE_SESSION_CORRECT,
  };
}

/**
 * Increases the session total incorrect count by 1
 * @return {object} An action object with a type of INCREASE_SESSION_INCORRECT
 */
export function increaseSessionIncorrect() {
  return {
    type: INCREASE_SESSION_INCORRECT,
  };
}

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
 * Records answer as correct/incorrect on server, updates state stats
 * @return {object} An action object with a type of PROCESS_ANSWER
 */
export function processAnswer() {
  return {
    type: PROCESS_ANSWER,
  };
}
